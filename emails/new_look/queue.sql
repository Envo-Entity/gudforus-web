-- new_look: queue the "Gud has a new look" email (one-off).
--
-- DO NOT RUN until all of these are true (see README):
--   1. The images are live: https://gudforus.com/email/new_look/new_look_{1..6}.jpg
--   2. send-pending-emails with the new_look template is deployed
--      (`supabase functions deploy send-pending-emails`) — older versions
--      log "Unknown email_type: new_look" and leave the rows pending.
--   3. The preview query at the bottom has been run and the numbers look right.
--   4. day0_at / day1_at below are set to real dates, and the preview's
--      "pending other campaigns" check returns 0 (the 95/day cap is shared).
--
-- Run ONCE in the Supabase SQL editor (or `supabase db query --linked -f queue.sql`).
-- send-pending-emails only sends rows once scheduled_for <= now(), so the stagger
-- below IS the release schedule: day 0 sends `day0_count` rows from day0_at, then
-- `per_day` rows per day from day1_at at the same time each day (04:30 UTC = 10:00
-- IST). DAILY_SEND_CAP (95 in the trailing 24h, shared with every campaign) is the
-- safety net on top. Re-running is a no-op for anyone already queued.
--
-- Audience: app users who
--   • have an email, a live account and profile, and aren't @example.com test accounts
--   • are NOT Apple "Hide My Email" relays (@privaterelay.appleid.com) — those bounce
--     until hi@gudforus.com is registered with Apple. The sender also skips them
--     (BLOCK_APPLE_PRIVATE_RELAY), this just keeps them out of the queue entirely
--   • EVERYONE who passes the rules below, active or not. The sender picks the copy
--     at send time from profiles.last_seen_at: "lapsed" ("missed you") if they haven't
--     opened the app in 7 days, "active" otherwise (recorded in metadata.variant_sent)
--   • not internal test accounts, and didn't sign up on/after 2026-11-10 (they've only
--     ever seen the new look) — remove those two lines to include them
--   • are subscribed and have product_updates_enabled (no email_preferences row = yes)
--   • have no existing new_look event (so test recipients and re-runs are skipped)
-- Order: most recently active first, then never-seen.

with params as (
  select timestamptz '2026-11-13 04:30:00+00' as day0_at,  -- TODO: set before running
         timestamptz '2026-11-14 04:30:00+00' as day1_at,  -- TODO: day after day0_at
         40 as day0_count,
         80 as per_day
),
audience as (
  select
    u.id    as user_id,
    u.email as recipient,
    row_number() over (order by p.last_seen_at desc nulls last, u.created_at, u.id) as rn
  from auth.users u
  join public.profiles p
    on p.id = u.id and p.deleted_at is null
  left join public.email_preferences ep
    on ep.user_id = u.id
  where coalesce(trim(u.email), '') <> ''
    and u.deleted_at is null
    and lower(u.email) not like '%@example.com'
    and lower(trim(u.email)) not like '%@privaterelay.appleid.com'
    and coalesce(ep.subscribed, true)
    and coalesce(ep.product_updates_enabled, true)
    and lower(u.email) not in ('8mayday8@googlemail.com', 'testaddress198@gmail.com', 'test@123.com')  -- internal test accounts
    and u.created_at < timestamptz '2026-11-10 00:00:00+00'  -- skip people who only ever saw the new look
    and not exists (
      select 1 from public.email_events e
      where e.user_id = u.id and e.email_type = 'new_look'
    )
),
batched as (
  select
    a.*,
    case when a.rn <= params.day0_count then 0
         else ceil((a.rn - params.day0_count) / params.per_day::numeric)::int end as batch_day
  from audience a
  cross join params
)
insert into public.email_events (user_id, email_type, recipient, status, scheduled_for, metadata)
select
  b.user_id,
  'new_look',
  b.recipient,
  'pending',
  case when b.batch_day = 0 then params.day0_at
       else params.day1_at + (b.batch_day - 1) * interval '1 day' end,
  jsonb_build_object('campaign', 'new_look', 'batch_day', b.batch_day)
from batched b
cross join params;


-- ─── Preview (read-only): run this FIRST ──────────────────────────────────────
--
-- 1) Audience and predicted split (the real split is decided at send time):
--
-- with params as (select 1)  -- reuse the audience CTE from the insert above, then:
-- select count(*) as total,
--        count(*) filter (where p.last_seen_at >= now() - interval '7 days') as active_copy,
--        count(*) filter (where p.last_seen_at is null
--                            or p.last_seen_at < now() - interval '7 days') as lapsed_copy
-- from audience a join public.profiles p on p.id = a.user_id;
--
-- 2) Other campaigns still waiting to send (must be 0 before day0_at, since the
--    95/day cap is shared):
--
-- select email_type, count(*) as pending
-- from public.email_events
-- where status = 'pending' and email_type <> 'welcome'
-- group by 1 order by 2 desc;
--
-- 3) The exact schedule this script would create: paste the INSERT's `with … batched`
--    CTEs above, then instead of the insert:
--
-- select b.batch_day, count(*) as emails
-- from batched b group by 1 order by 1;


-- ─── Monitoring (read-only) ───────────────────────────────────────────────────
--
-- select metadata->>'batch_day' as day, status, metadata->>'variant_sent' as variant,
--        last_error, count(*)
-- from public.email_events where email_type = 'new_look'
-- group by 1, 2, 3, 4 order by (metadata->>'batch_day')::int nulls first, 2, 3, 4;
--
-- To pause the rest of the campaign (rows not yet sent):
-- update public.email_events set status = 'skipped', last_error = 'paused'
-- where email_type = 'new_look' and status = 'pending';
