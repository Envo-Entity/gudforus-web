# New Look — Email Campaign

Come-back email announcing the Season 2 redesign: the blueberry mascot (its mood
follows your score), cleaner screens and clearer scores, and sharing scans with
friends.

## Status

**Ready, not queued.** Nothing has been sent to users. Two test sends went out via a
separate Resend account (inline images) on 10 Nov 2026 to the founders only.

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

## Audience

People who **haven't opened the app in the last 7 days**, excluding Apple private relay
addresses. Full rules in `queue.sql`:

- `profiles.last_seen_at` is null or older than 7 days (the app updates it on launch,
  sign-in and every foreground)
- not `@privaterelay.appleid.com`, not `@example.com`
- `subscribed` and `product_updates_enabled` (no preferences row = yes)
- no existing `new_look` event

### Two safety nets in the sender (`send-pending-emails`)

1. **Apple private relay** — `BLOCK_APPLE_PRIVATE_RELAY = true` marks any relay recipient
   `skipped` / `apple_private_relay`. This was live in v25 but uncommitted; it's now
   committed byte-for-byte from the deployed source.
2. **Opened the app since being queued** — for `new_look` only, the sender re-reads
   `profiles.last_seen_at` and skips anyone active in the last 7 days
   (`skipped` / `active_recently`), because sends are spread over several days.

## How to send

**Test first** (one email through the real pipeline). `force_send` skips only the
"opened the app in 7 days" check, so active accounts can receive the test:

```sql
insert into public.email_events (user_id, email_type, recipient, status, scheduled_for, metadata)
select u.id, 'new_look', u.email, 'pending', now(),
       jsonb_build_object('campaign', 'new_look', 'test', true, 'force_send', true)
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

Stagger: 40 on day 0, then 80/day at 10:00 IST, under the 95/day cap. Preview on
11 Nov 2026: 570 people (559 of them also got pro_50_off; that's intended — everyone
inactive should hear about the new look), sent over 8 days.
