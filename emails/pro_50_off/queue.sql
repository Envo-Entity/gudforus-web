-- pro_50_off: queue the free-user audience into email_events (one-off).
--
-- Run ONCE, after review, in the Supabase SQL editor (or `supabase db query`).
-- send-pending-emails picks rows up only once scheduled_for <= now(), so the
-- stagger below is the whole release schedule:
--   day 0: rows 1–40 at day0_at, then 80 rows per day from day1_at at the same
--   time each day (04:30 UTC = 10:00 IST). The sender's DAILY_SEND_CAP (95 sent in
--   the trailing 24h) is the safety net on top; welcome emails are never held.
--   Run on 2026-11-02: day 0 went out immediately, day 1 = 2026-11-03.
--
-- Audience (see README): emailable app users, not @example.com, subscribed and
-- newsletter_enabled (no email_preferences row = yes), no live production Pro
-- subscription, and no existing pro_50_off event (so re-running is a no-op for
-- anyone already queued, and the manual test recipient is excluded).
-- Order is deterministic: auth.users.created_at, then id.
--
-- To preview without inserting, run the commented-out SELECT at the bottom.

with params as (
  select timestamptz '2026-11-02 06:40:00+00' as day0_at,  -- first 40 (in the past = due now)
         timestamptz '2026-11-03 04:30:00+00' as day1_at   -- 80/day from here, same time daily
),
audience as (
  select
    u.id    as user_id,
    u.email as recipient,
    row_number() over (order by u.created_at, u.id) as rn
  from auth.users u
  join public.profiles p
    on p.id = u.id and p.deleted_at is null
  left join public.email_preferences ep
    on ep.user_id = u.id
  where coalesce(trim(u.email), '') <> ''
    and u.deleted_at is null
    and lower(u.email) not like '%@example.com'
    and coalesce(ep.subscribed, true)
    and coalesce(ep.newsletter_enabled, true)
    and not exists (
      select 1 from public.subscriptions s
      where s.user_id = u.id
        and s.environment = 'production'
        and s.status in ('active', 'trial', 'canceled')
        and coalesce(s.current_period_end, s.trial_ends_at, now() + interval '1 day') > now()
    )
    and not exists (
      select 1 from public.email_events e
      where e.user_id = u.id and e.email_type = 'pro_50_off'
    )
),
batched as (
  select
    a.*,
    case when a.rn <= 40 then 0 else ceil((a.rn - 40) / 80.0)::int end as batch_day
  from audience a
)
insert into public.email_events (user_id, email_type, recipient, status, scheduled_for, metadata)
select
  b.user_id,
  'pro_50_off',
  b.recipient,
  'pending',
  case when b.batch_day = 0 then params.day0_at
       else params.day1_at + (b.batch_day - 1) * interval '1 day' end,
  jsonb_build_object('campaign', 'pro_50_off', 'batch_day', b.batch_day)
from batched b
cross join params;


-- ─── Preview (read-only): same audience and stagger, count per day ─────────────
--
-- with params as (
--   select timestamptz '2026-11-02 06:40:00+00' as day0_at,
--          timestamptz '2026-11-03 04:30:00+00' as day1_at
-- ),
-- audience as (
--   select
--     u.id    as user_id,
--     u.email as recipient,
--     row_number() over (order by u.created_at, u.id) as rn
--   from auth.users u
--   join public.profiles p
--     on p.id = u.id and p.deleted_at is null
--   left join public.email_preferences ep
--     on ep.user_id = u.id
--   where coalesce(trim(u.email), '') <> ''
--     and u.deleted_at is null
--     and lower(u.email) not like '%@example.com'
--     and coalesce(ep.subscribed, true)
--     and coalesce(ep.newsletter_enabled, true)
--     and not exists (
--       select 1 from public.subscriptions s
--       where s.user_id = u.id
--         and s.environment = 'production'
--         and s.status in ('active', 'trial', 'canceled')
--         and coalesce(s.current_period_end, s.trial_ends_at, now() + interval '1 day') > now()
--     )
--     and not exists (
--       select 1 from public.email_events e
--       where e.user_id = u.id and e.email_type = 'pro_50_off'
--     )
-- ),
-- batched as (
--   select
--     a.*,
--     case when a.rn <= 40 then 0 else ceil((a.rn - 40) / 80.0)::int end as batch_day
--   from audience a
-- )
-- select
--   b.batch_day,
--   case when b.batch_day = 0 then params.day0_at
--        else params.day1_at + (b.batch_day - 1) * interval '1 day' end as scheduled_for,
--   count(*) as emails
-- from batched b
-- cross join params
-- group by 1, 2
-- order by 1;


-- ─── Monitoring (read-only) ───────────────────────────────────────────────────
--
-- select metadata->>'batch_day' as day, status, count(*)
-- from public.email_events where email_type = 'pro_50_off'
-- group by 1, 2 order by (metadata->>'batch_day')::int nulls first, 2;
