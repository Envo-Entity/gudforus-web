# SOP: adding a new Gud email campaign

Read this before touching anything email-related. It is the pre-digested version of
`supabase/functions/send-pending-emails/index.ts`, the existing campaigns in `emails/`
and how we ship them. Verify against the code if something looks off, and update this
file when the pipeline changes.

> **`production` is this repo's main branch, not `main`.** Amplify deploys `production`
> to gudforus.com, and it's the source of truth for the edge functions. Branch from it,
> merge into it, and deploy functions from a clean checkout of it.

---

## 1. How sending works (the 60-second version)

```
queue.sql (run once, by hand)          pg_cron job 27, every 5 min
        │                                         │
        ▼                                         ▼
public.email_events  ── status='pending' ──►  send-pending-emails (edge function)
  one row per email                              │  render template, send via Resend
  scheduled_for = earliest send time             ▼
                                         status → sent / skipped / failed
```

- **The queue is `public.email_events`**, shared by every email. One row per email:
  `user_id` (app user) or `subscriber_id` (web visitor), `email_type`, `recipient`,
  `status` (`pending` → `sent` / `skipped` / `failed`), `scheduled_for`, `attempts`,
  `last_error`, `sent_at`, `metadata` (jsonb; `resend_id` is stored here on success).
- **The sender is `send-pending-emails`** (pg_cron job 27, every 5 minutes). Each run:
  1. Counts emails sent in the trailing 24 h. **`DAILY_SEND_CAP = 95`** (Resend's free
     plan allows 100/day). Welcome emails always go; everything else waits once the cap
     is hit.
  2. Takes due rows (`status = 'pending'` and `scheduled_for <= now()`), welcome first,
     then the rest oldest-first, **at most `MAX_PER_RUN = 10` per run** (≈120/hour).
  3. Skips rows that fail the checks in §4 (marked `skipped` with a `last_error`).
  4. Renders the email for its `email_type`, adds a signed unsubscribe link and the
     `List-Unsubscribe` / one-click headers, and sends from **`Gudforus <hi@gudforus.com>`**.
  5. On success: `sent` + `resend_id`. On a Resend quota error: stays `pending` and moves
     to the next 10:00 IST. Other errors: retried with backoff, `failed` after 3 attempts.
- **Release pacing is done with `scheduled_for`, not by the sender.** A campaign's queue
  script stamps each row with a day's timestamp (e.g. 40 on day 0, then 80/day at
  10:00 IST). The sender ignores rows until their time comes.
- **Templates** live in `supabase/functions/shared/email-templates.ts`: one
  `<NAME>_TEMPLATE` string + one `render<Name>Email(firstName, unsubscribeUrl)` per type.
- **Images** are served by the website: `public/email/<campaign>/…` →
  `https://gudforus.com/email/<campaign>/…`, deployed by Amplify when `production` moves.

### Secrets and settings (Supabase → Edge Functions → Secrets)

| Secret | What it does |
|---|---|
| `RESEND_API_KEY` | The Gud For Us Resend account (gudforus.com is verified there) |
| `EMAIL_SECRET` | Signs unsubscribe links (`https://gudforus.com/unsubscribe?…`) |
| `TEST_EMAIL_OVERRIDE` | **If set, every email goes to this address instead.** Must be unset in production |

---

## 2. The quality bar

An email is a product surface. It ships only when it meets all of this.

**Design**
- **Matches the app.** Use the app's design tokens (`gud-for-us-app/common/ui/tokens.ts`):
  brand green `#4A6C48`, white, warm stone `#F0EFEA`, forest `#1C2A22`; DM Serif Display
  for big headlines, a clean sans for everything else; the app's 3D icons and the blueberry
  mascot (`gud-for-us-app/assets/mascot/`).
- **Mostly images, a little bulletproof HTML.** Email CSS is unreliable, so the rich
  parts are image slices; the CTA button, short text blocks and footer are table-based
  HTML with inline styles. No flexbox/grid, no web-font dependence for meaning.
- **600 px email, slices made at 1200 px (2×).** Every slice shares the email background
  colour at its edges, so stacked slices show **no seams**. Check the corners: they must
  match the background within ±1–2 levels. Colour-correct if needed.
- **Small files.** Progressive JPEG, ~60–150 KB per slice (quality ~78, 4:4:4 chroma),
  total under ~1 MB. Run `jpegtran -optimize -progressive` at the end.
- **Accessible.** Every image has real alt text that carries its message. Readable when
  images are blocked. Minimum text size on images ≈ 13 px after scaling to a phone.
- **No AI slop.** No purple gradients, glow, fake UI text, gibberish, stock people, emoji
  as icons, all-caps kickers. Generated text on images must be spelled perfectly, or be
  set by hand instead.

**Copy**
- Voice: an honest, playful friend (see `gud-for-us-app/PRODUCT.md`). Sentence case.
- **Only true claims.** No invented features, numbers, testimonials or offers. Example
  scores in images must be clearly illustrative and on unbranded products.
- **Subject** ≤ ~60 characters. **Don't put `{{name}}` in the subject**: with no display
  name it falls back to the email's local part (e.g. "john.smith87"). `{{name}}` in the
  body is fine.
- A **preheader** (hidden preview text) that adds to the subject, not repeats it.

**Links**
- **Never link `gudforus://…`** (Gmail web strips custom schemes). Use the App Store / Play
  Store links (they show Open / Update / Get), or a gudforus.com landing page that opens
  the app (see `app/perk/ngme3k/` for the pattern).
- Footer and unsubscribe block **copied exactly** from an existing campaign, with
  `{{unsubscribe_url}}`.

**Proof before sending**
- Previewed at desktop and 375 px phone width.
- A **real test send through the pipeline** (§6) opened in Gmail on desktop **and** phone:
  images load, no seams, links work, unsubscribe link present.

---

## 3. Step by step

Do the work on a branch from `production`. Nothing is sent until step 8.

### Step 1 — Design kit
Put working files (image prompts, references, previews) wherever suits, e.g.
`gud-for-us-app/email-campaigns/<campaign>/` (see `new-look/` there for a full example:
`PROMPTS.md`, `references/`, `slices/`, `email.html`, `COPY.md`).

### Step 2 — Images on the website
```
public/email/<campaign>/<campaign>_1.jpg … _N.jpg
```
Commit to `production` (Amplify deploys in ~2 min). Verify every URL:
```bash
for n in 1 2 3; do curl -s -o /dev/null -w "%{http_code} %{content_type} %{size_download}\n" \
  "https://gudforus.com/email/<campaign>/<campaign>_$n.jpg"; done
```
All must be `200 image/jpeg`. **Images must be live before any send.**

### Step 3 — Campaign folder `emails/<campaign>/`
- `email.html` — the final template. Variables: `{{name}}`, `{{unsubscribe_url}}`.
  Image `src` must be the absolute `https://gudforus.com/email/<campaign>/…` URLs.
  **No backticks and no `${`** in the HTML (it gets embedded in a TS template literal).
- `README.md` — status, subject, preheader, audience, assets, how to send (copy the
  structure of `emails/new_look/README.md`).
- `queue.sql` — for one-off campaigns (§5).

### Step 4 — Template (`supabase/functions/shared/email-templates.ts`)
Append, following the existing ones:
```ts
const <NAME>_TEMPLATE = `…contents of emails/<campaign>/email.html…`;

export function render<Name>Email(firstName: string, unsubscribeUrl: string) {
  return {
    subject: "…",
    html: <NAME>_TEMPLATE
      .replace(/\{\{name\}\}/g, firstName)
      .replace(/\{\{unsubscribe_url\}\}/g, unsubscribeUrl),
  };
}
```

### Step 5 — Sender (`supabase/functions/send-pending-emails/index.ts`)
Three small edits:
1. Import `render<Name>Email`.
2. In `isEligibleAppUser`, gate the type on the right preference (§4):
   `if (emailType === "<type>" && !prefs.<pref>) return false;`
3. Add a `case "<type>":` in `buildEmail` (copy an existing case; keep the
   `List-Unsubscribe` headers).

**Need two versions of the same email** (e.g. different copy for active vs lapsed
users)? Don't add a second type or copy the template. Use **variants** — see
`new_look`: one `<NAME>_TEMPLATE` with `{{slot}}` placeholders for the parts that differ,
a `<NAME>_COPY: Record<Variant, Record<string, string>>` table, a `variant` parameter on
the render function, and a small `pick<Name>Variant(row, …)` in the sender that chooses
at **send time** (honouring `metadata.variant` for tests) and records
`metadata.variant_sent` on success.

Check syntax (no Deno locally):
```bash
cd ../gud-for-us-app && node -e "const ts=require('typescript'),fs=require('fs');for(const f of ['send-pending-emails/index.ts','shared/email-templates.ts']){const o=ts.transpileModule(fs.readFileSync('../gud-for-us-app-web/supabase/functions/'+f,'utf8'),{reportDiagnostics:true});console.log(f,(o.diagnostics||[]).length||'ok')}"
```

### Step 6 — Merge and deploy
1. Merge your branch into `production` and push.
2. Deploy **from a clean checkout of `production`** (never from a working copy with
   uncommitted changes — the deploy uploads whatever is on disk):
   ```bash
   supabase functions deploy send-pending-emails --project-ref ihichdejyaeignzbnfgb \
     --no-verify-jwt --import-map supabase/functions/import_map.json --workdir <checkout>
   ```
   - `--no-verify-jwt` is **required**: there's no `supabase/config.toml` in the repo, and
     pg_cron calls the function without a user JWT. Without the flag, sending stops.
   - "Docker is not running" warnings are harmless.
3. Verify: `supabase functions list --project-ref ihichdejyaeignzbnfgb` shows a new
   version with `verify_jwt: false`, and the downloaded source matches git:
   ```bash
   supabase functions download send-pending-emails --project-ref ihichdejyaeignzbnfgb --workdir /tmp/x
   diff /tmp/x/supabase/functions/send-pending-emails/index.ts supabase/functions/send-pending-emails/index.ts
   ```

### Step 7 — Test send (one email, real pipeline)
```sql
insert into public.email_events (user_id, email_type, recipient, status, scheduled_for, metadata)
select u.id, '<type>', u.email, 'pending', now(),
       jsonb_build_object('campaign', '<type>', 'test', true)  -- + 'variant', '<name>' to force one
from auth.users u where lower(u.email) = '<your address>';
```
- Sent within ~5 min. Watch it:
  `select status, last_error, sent_at, metadata->>'resend_id' from public.email_events where email_type='<type>' and metadata->>'test'='true';`
- For a campaign with variants, send one test per variant with `'variant', '<name>'`.
- A test row also excludes that address when the campaign is queued (queue scripts skip
  anyone who already has a row of that type).

### Step 8 — Queue the audience (only with the founder's go-ahead)
Run the campaign's `queue.sql` **preview queries first**, then the insert once (§5).

### Step 9 — Monitor
```sql
select metadata->>'batch_day' as day, status, last_error, count(*)
from public.email_events where email_type = '<type>'
group by 1, 2, 3 order by (metadata->>'batch_day')::int nulls first, 2, 3;
```
Pause the rest: `update public.email_events set status='skipped', last_error='paused'
where email_type='<type>' and status='pending';`

---

## 4. Who can receive what (built-in rules)

Every row is checked by the sender at send time:

| Check | Result if it fails |
|---|---|
| Recipient is `@privaterelay.appleid.com` (`BLOCK_APPLE_PRIVATE_RELAY`) | `skipped` / `apple_private_relay` |
| App user: `email_preferences.subscribed` is false (no row = subscribed) | `skipped` / `unsubscribed` |
| App user: the type's preference is off (below) | `skipped` / `unsubscribed` |
| Web visitor: `newsletter_subscribers.subscribed` is false | `skipped` / `unsubscribed` |

Preference per email type (`isEligibleAppUser`):

| Preference column | Email types |
|---|---|
| `welcome_email_enabled` | `welcome` |
| `newsletter_enabled` | `newsletter`, `pro_50_off` (offers, marketing) |
| `product_updates_enabled` | `product_updates`, `others_in_health_profile`, `new_look` (product news) |

Pick the preference by what the email is: an offer or promotion → `newsletter_enabled`;
news about the product → `product_updates_enabled`.

Apple relay addresses bounce until `hi@gudforus.com` is registered in Apple Developer
(Sign in with Apple → Email Communication). When it is, set `BLOCK_APPLE_PRIVATE_RELAY`
to `false` and redeploy.

---

## 5. Queue scripts (one-off campaigns)

Copy `emails/new_look/queue.sql`. The pattern:
- **Audience CTE**: `auth.users` ⨝ `profiles` (not deleted) ⟕ `email_preferences`;
  exclude `@example.com`, `@privaterelay.appleid.com`, opted-out users, and **anyone who
  already has a row of this type** (makes re-runs safe and skips test recipients).
- **Stagger**: `row_number()` → `batch_day` → `scheduled_for` (e.g. 40 on day 0, then
  80/day at 04:30 UTC = 10:00 IST). Keep each day under the 95 cap, and remember the cap
  is **shared** with every other campaign and welcome emails.
- `metadata = {'campaign': …, 'batch_day': …}` for monitoring.
- Always ship a **read-only preview** (audience breakdown + per-day counts) and a
  **monitoring** query in the same file, and run the preview before the insert.
- Before queuing, check nothing else is still pending:
  `select email_type, count(*) from public.email_events where status='pending' and email_type<>'welcome' group by 1;`

Running SQL from the CLI (read-only previews or the one-off insert):
```bash
supabase db query --linked --project-ref ihichdejyaeignzbnfgb -f path/to/file.sql
```

Recurring/automated emails (e.g. a profile-incomplete nudge) use a separate
`schedule-<name>-emails` edge function on its own pg_cron job that inserts rows into
`email_events`; the sender stays the same.

---

## 6. Gotchas

- **Deploy only from a clean `production` checkout.** Function changes once lived only in
  a local working copy and were deployed from there; a redeploy from git would have
  silently removed them.
- **Never set `TEST_EMAIL_OVERRIDE` in production** unless you mean to send everything to
  one address.
- **`supabase db query` needs `--linked --project-ref ihichdejyaeignzbnfgb`** when run
  outside a linked folder.
- **Resend free plan: 100/day.** That's why the cap is 95. Big campaigns take days; plan
  the stagger and don't overlap campaigns.
- **Test sends from other Resend accounts** (e.g. inline-image previews) can't use
  `hi@gudforus.com`; only the Gud For Us Resend account has gudforus.com verified.

## Existing campaigns

| Campaign | Type | Preference | Notes |
|---|---|---|---|
| `emails/welcome.html` | `welcome` | `welcome_email_enabled` | On sign-up; never held by the cap |
| `emails/others_in_health_profile/` | `others_in_health_profile` | `product_updates_enabled` | Scheduled by its own function |
| `emails/pro_50_off/` | `pro_50_off` | `newsletter_enabled` | One-off, sent 2–10 Nov 2026 (670) |
| `emails/new_look/` | `new_look` | `product_updates_enabled` | Season 2 redesign; variants `lapsed` / `active` picked at send time |
