# New Look — Email Campaign

Come-back email announcing the Season 2 redesign: the blueberry mascot (its mood
follows your score), cleaner screens and clearer scores, and sharing scans with
friends.

## Status

**Sending (queued 12 Nov 2026).**

- 12 Nov, 12:10 IST: 25 users active in the last 7 days, sent by hand (all `active`).
- 12 Nov, 12:25 IST: everyone else eligible (569, all lapsed at queue time) queued in one
  run of `queue.sql`: 40 due at once, then 80/day at 13:00 IST (07:30 UTC) 13–18 Nov, and
  the last 49 on 19 Nov. Each row carries `metadata.batch_day` (0–7).
- Earlier tests: founders via a separate Resend account (10 Nov), and four through the
  real pipeline to the internal test address (both variants).
- Skipped by hand: one complaint, set to `subscribed = false` before queuing.

Queued rows still pick their variant when they send, so anyone who opens the app before
their day gets the `active` copy.

## Template

- **Source**: `email.html` (embedded in `supabase/functions/shared/email-templates.ts`
  as `NEW_LOOK_TEMPLATE`, rendered by `renderNewLookEmail`)
- **Subject**: `Gud has a new look (and a blueberry with feelings)` — no `{{name}}`, since
  without a display name it falls back to the email's local part
- **Preheader**: `Fresh new look, same honest answers. Plus: you can share your scans now.`
- **Template variables**: `{{name}}` (intro line), `{{unsubscribe_url}}` (footer)
- **Email type**: `new_look`, gated on `email_preferences.product_updates_enabled`
- Buttons go to the App Store / Play Store pages (Open, Update or Get); images link to
  gudforus.com. No `gudforus://` links (Gmail web strips custom schemes).

Full design kit (image prompts, references, copy options, local preview) lives in the
app repo: `gud-for-us-app/email-campaigns/new-look/`.

## Assets

Served from `gudforus.com`, backed by `public/email/new_look/` (deployed with
`production`, verified live 11 Nov 2026):

| URL | Size |
|---|---|
| `/email/new_look/new_look_1.jpg` — hero | 1200×1499, 91 KB |
| `/email/new_look/new_look_2.jpg` — new Home on a phone | 1200×1600, 120 KB |
| `/email/new_look/new_look_3.jpg` — meet your blueberry | 1200×1200, 93 KB |
| `/email/new_look/new_look_4.jpg` — share your scans | 1200×1499, 112 KB |
| `/email/new_look/new_look_5.jpg` — everything else, still here | 1200×800, 71 KB |
| `/email/new_look/new_look_6.jpg` — your blueberry missed you | 1200×960, 59 KB |

All slices sit on `#F0EFEA` (corners colour-corrected to ±1) so they stack seamlessly.

## Two versions, one email type

`new_look` has two copies of the same layout, chosen **at send time** by
`send-pending-emails` from `profiles.last_seen_at`:

| Variant | Who | Differs in |
|---|---|---|
| `lapsed` | hasn't opened the app in 7+ days | "it's been a while…" intro, `new_look_6.jpg` ("Your blueberry missed you."), "Come say hi.", "No hard feelings" small print |
| `active` | opened the app in the last 7 days | "thanks for scanning with Gud lately…" intro, `new_look_v2_6.jpg` ("Say hi to your blueberry."), "See it for yourself.", "Tap Update" small print |

The layout lives once in `email.html`; only six slots differ (`{{intro}}`,
`{{closing_image}}`, `{{closing_image_alt}}`, `{{closing_heading}}`, `{{closing_line}}`,
`{{small_print}}`), filled from `NEW_LOOK_COPY` in `shared/email-templates.ts`. The
variant sent is stored in `metadata.variant_sent`; `metadata.variant` forces one (tests).

## Audience

Everyone eligible, active or lapsed, excluding Apple private relay addresses. Full rules
in `queue.sql`:

- not `@privaterelay.appleid.com`, not `@example.com`, not internal test accounts
- signed up before 10 Nov 2026 (people who only ever saw the new look are skipped)
- `subscribed` and `product_updates_enabled` (no preferences row = yes)
- no existing `new_look` event

The sender also skips Apple private relay recipients at send time
(`BLOCK_APPLE_PRIVATE_RELAY`, `skipped` / `apple_private_relay`).

## How to send

**Test first** (one email per variant through the real pipeline). `variant` forces the
copy; run it twice, once with `'lapsed'` and once with `'active'`:

```sql
insert into public.email_events (user_id, email_type, recipient, status, scheduled_for, metadata)
select u.id, 'new_look', u.email, 'pending', now(),
       jsonb_build_object('campaign', 'new_look', 'test', true, 'variant', 'lapsed')
from auth.users u where lower(u.email) = 'you@example.com';  -- your address
```

The sender picks it up within 5 minutes. A test row also stops that address from
being queued again by `queue.sql` (it skips anyone with a `new_look` row).

1. Merge this branch into `production` (website + function source).
2. Deploy the sender: `supabase functions deploy send-pending-emails` (from the repo root,
   linked to `ihichdejyaeignzbnfgb`). Without this, `new_look` rows log
   "Unknown email_type" and stay pending.
3. Run the **preview** queries at the bottom of `queue.sql`. Check the audience size, and
   that no other campaign is still pending (the 95/day cap is shared).
4. Set `day0_at` / `day1_at` in `queue.sql`, then run it once.
5. Watch with the monitoring query. To pause, run the `update … 'paused'` statement.

Stagger: 40 on day 0, then 80/day at a fixed time (13:00 IST for the Nov 2026 run), under
the 95/day cap. The cap is a rolling 24h count shared with welcome emails, so keep day 0 at
least 24h before day 1's time, and pause other campaigns while this one runs. Run the preview
queries for the current size and predicted lapsed/active split.
