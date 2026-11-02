# Pro 50% Off — Email Campaign

Marketing email to free users: a 50% discount on Gud Pro, framed around how Pro makes
everyday food choices healthier.

## Status

**Sending.** Queued on 2 Nov 2026 with `queue.sql` (670 users, 2–10 Nov) through
`send-pending-emails` v24. Landing page: `app/perk/ngme3k/`. The offer runs until
**30 November 2026 (IST)**, per the founder.

## Template

- **Source**: `email.html`
- **Subject**: `{{name}}, 50% off Gud Pro — eat better for less`
- **Preheader**: `Your 50% off Gud Pro is waiting. One tap and it's yours.`
- **Template variables**:
  - `{{name}}` — first name (offer card body)
  - `{{unsubscribe_url}}` — signed unsubscribe link

Every button and image links to `https://gudforus.com/perk/ngme3k` (hardcoded). The end
date appears under the button and in small print in the footer.

Layout: logo → image 1 (hero) → live-HTML offer card ("50% OFF" badge, "Get 50% off"
button) → image 2 (what Pro does) → closing CTA → standard footer. There is no coupon
code: the button opens the app's existing 50% offer screen.

## Audience

Free users = no live production subscription (`subscriptions.environment = 'production'`
with status `active`/`trial`/`canceled` and a future period end). As of 29 Oct 2026:
690 free users, 667 of them emailable (`subscribed` and `newsletter_enabled`, excluding
`@example.com` test accounts). Treat as a `newsletter`-class email for opt-outs.

## How the 50% is applied

No coupon code and no app release. The app already ships a 50% offer screen at
`/(paywall)/offer`, opened by the deep link `gudforus://offer`:

- **iPhone** — buys `monthly_v2_offer` / `yearly_v2_offer` from the `exit_offer`
  offering in RevenueCat (separate, permanently discounted products).
- **Android** — buys the regular plans with the `exitoffer` Play offer applied.

Signed-in users who land on that screen stay there (`app/_layout.tsx` doesn't redirect
away from the paywall group). Signed-out users go through sign-in to the home screen
instead, so they don't see the offer.

### Landing page: `gudforus.com/perk/ngme3k`

Source: `app/perk/ngme3k/` (unindexed, not in the sitemap; the path is random on
purpose). On load it detects the device from the browser's user agent:

- **Android** — opens an `intent://` link: Gud on the offer screen if installed,
  otherwise the Play Store (Android handles the fallback itself).
- **iPhone / iPad** — opens `gudforus://offer` and stays on the page. No automatic
  App Store jump: iOS's "Open in Gud?" prompt keeps the page visible, so a timed
  fallback opened the App Store on top of the app. People without Gud use the badge.
- **Computer** — no redirect; says to open the link on a phone and shows both badges.
- **After 30 Nov 2026 23:59 IST** — shows "This offer has ended"; the button opens
  Gud normally. No redeploy needed.

The page always shows an "Open Gud & get 50% off" button too, for in-app browsers
that block the automatic open and for people who just installed. Each open sends a
`perk_offer_open` Google Analytics event (platform, auto/tap). Don't put `gudforus://`
directly in the email, because Gmail web strips custom-scheme links.

The in-app 50% screen itself stays reachable after November for free users who close
the paywall. To end it everywhere, turn off the `exit_offer` offering in RevenueCat.

**Before sending, check:**
- Open `gudforus://offer` on an iPhone and an Android phone and confirm both show half
  prices. If the screen says "Special offer unavailable", the products aren't live.
- In Play Console, check who `exitoffer` is open to. If it's new customers only, the
  35 users whose Pro has expired won't get it on Android.
- In App Store Connect, check whether the `_v2_offer` products renew at the discounted
  price. The email doesn't promise "first period only" either way.

## Assets

Served from `gudforus.com`, backed by this repo's `public/` directory:

| URL | Repo path |
|---|---|
| `/email/pro_50_off/pro_50_off_1.jpg` | `public/email/pro_50_off/pro_50_off_1.jpg` |
| `/email/pro_50_off/pro_50_off_2.jpg` | `public/email/pro_50_off/pro_50_off_2.jpg` |
| `/email/appstore.svg`, `/email/playstore.svg` | shared across all campaigns |
| `/gud-green.png` | shared logo |

Both images are **1086 × 1448 (3:4 portrait)**, progressive JPG at quality 85
(~185 KB and ~215 KB). The background is colour-matched to the email's `#f6f1ee` and
every edge fades into it (70 px top/sides, 130–150 px bottom), so no seam shows where
an image meets the HTML. **The web app must be deployed before any send.**

### Shared style (paste into both prompts)

> Premium editorial wellness ad for the "gud." food-scanner app. Warm cream background
> (#f6f1ee) with soft natural light and gentle shadows. Headline in a high-contrast serif
> (Playfair Display style), near-black green (#1c2b14), with the accent words in
> italic serif, olive green (#4a6e35), underlined by one thin hand-drawn green swoosh.
> Small body text in a clean geometric sans (Inter style). A few fresh green leaves
> floating at the edges, slightly blurred. Thin dashed hand-drawn arrows connecting
> elements. Realistic iPhone mockups with a clean white app UI, rounded cards, soft
> drop shadows. Photorealistic products, calm and uncluttered, generous whitespace.
> No borders, no extra logos, no watermark. Portrait 3:4, 1086 × 1448.

### Image 1 — Hero (`pro_50_off_1.jpg`)

**Attach as references**: `public/email/1.jpg` (layout, leaves, product cards),
`public/email/others_in_health_profile/others_1.jpg` (pill tag + headline treatment),
`public/email/2.jpg` (score card style).

**Prompt**:

> [Shared style] Top-left: a small rounded pill tag, pale sage fill, text
> "50% OFF GUD PRO" in small caps sans with a tiny sparkle icon. Below it, the
> headline on two lines: "Healthier choices," (bold serif) / "half the price." (italic
> olive serif with a hand-drawn swoosh underneath). Under the headline, small sans
> text on three lines: "Scan anything. / Know what's in it. / Find something better."
> Right side and lower half: a hand holding an iPhone that shows a Gud scan result for
> a sugary cereal box — "Overall Health Score 32/100" with a red-to-green bar,
> "Compatibility: Low" with a red heart icon. Next to the phone, a floating white card
> labelled "Better alternative" showing an oat granola pack with "88/100" and a green
> check heart, joined to the phone by a dashed arrow. At the bottom-left, a pale green
> handwritten sticky note slightly rotated: "50% off, just for you ✓". A few groceries
> (apple, oat pack, almond milk) softly out of focus at the bottom edge.

### Image 2 — What Pro does (`pro_50_off_2.jpg`)

**Attach as references**: `public/email/2.jpg` ("A small swap, a big difference" — swap
layout), `public/email/others_in_health_profile/others_2.jpg` (sticky notes + checklist
card), `public/email/incomplete_profile/impact_for_you.jpg` (feature row icons).

**Prompt**:

> [Shared style] Headline at the top, left-aligned, two lines: "Every scan," (bold serif)
> / "a smarter swap." (italic olive serif with a hand-drawn swoosh). Middle: two
> products side by side on the cream background — left, a bag of cheese puffs with a
> small red badge "32"; right, a bag of baked lentil chips with a green badge "88";
> a curved dashed arrow from left to right labelled "Swap this → for this" in small
> handwritten script. Lower half: a white rounded card with four rows, each with a
> small pale-sage circular line icon on the left, a bold sans title and a grey subline:
> 1) scan icon — "Unlimited scans" / "Your whole pantry, no 5-scan limit."
> 2) heart icon — "Personal health match" / "Checked against your allergies and conditions."
> 3) leaf icon — "Healthier alternatives" / "A better pick, right on the shelf."
> 4) magnifier icon — "Every ingredient explained" / "Additives decoded in plain words."
> Bottom-right: a cream handwritten sticky note, slightly rotated: "Better food. / Better you."

## Sending pipeline

Same queue as the other campaigns: `email_events` → `send-pending-emails` (pg_cron job 27,
every 5 minutes, up to 10 emails per run) → Resend. Source is in this repo under
`supabase/functions/` (`send-pending-emails/index.ts`, `shared/`, `import_map.json`),
copied from the deployed version before editing.

- **Template**: `shared/email-templates.ts` has `PRO_50_OFF_TEMPLATE` (a copy of
  `email.html`) and `renderPro50OffEmail(firstName, unsubscribeUrl)`. If you change
  `email.html`, copy it into the template and redeploy.
- **Sender**: `send-pending-emails/index.ts` has a `pro_50_off` case in `buildEmail()`
  (same From and List-Unsubscribe headers as the other campaigns). `isEligibleAppUser()`
  marks it `skipped` when `subscribed` or `newsletter_enabled` is false.
- **Daily cap**: Resend's free plan allows 100 emails/day. Each run counts `sent` rows
  from the last 24 hours. Welcome emails are fetched first and always go out. Other
  emails fill the rest of the run only while that count is under `DAILY_SEND_CAP = 95`;
  anything over stays `pending`, untouched, until the window frees up.
- **Resend quota errors**: a daily (or monthly) quota error doesn't count as an attempt.
  The row stays `pending` with `scheduled_for` moved to the next 04:30 UTC (10:00 IST).
  The per-second rate limit (also a 429) keeps the normal retry: 5 min × attempt,
  `failed` after 3 attempts.
- **Rate limit**: Resend allows 10 requests/second, so each run starts its sends 150 ms
  apart (`SEND_SPACING_MS`).
- **Queueing**: `queue.sql` is a one-off `INSERT … SELECT` of the audience above, minus
  anyone who already has a `pro_50_off` event. It staggers `scheduled_for`: 40 emails at
  `day0_at`, then 80 per day from `day1_at`, released at 04:30 UTC (10:00 IST). Run on
  2 Nov 2026 for 670 users: 40 on 2 Nov, 80/day 3–9 Nov, 70 on 10 Nov. No new scheduler
  is needed, because the sender ignores rows until `scheduled_for` has passed. Users who
  sign up during the offer aren't included.

### Run it

1. Run the commented-out preview at the bottom of `queue.sql` (read-only) and check the
   per-day counts.
2. Run the `INSERT` once. It is safe to re-run: anyone already queued is excluded.

### Monitor

```sql
-- progress by day and status
select metadata->>'batch_day' as day, status, count(*)
from email_events where email_type = 'pro_50_off'
group by 1, 2 order by (metadata->>'batch_day')::int nulls first, 2;

-- sends in the trailing 24h (the cap is 95)
select count(*) from email_events where status = 'sent' and sent_at > now() - interval '24 hours';

-- recent errors
select email_type, status, attempts, last_error, scheduled_for
from email_events where last_error is not null order by created_at desc limit 20;

-- recent sender runs (the JSON includes sent / failed / deferred / sent_last_24h)
select status_code, left(content::text, 200), created
from net._http_response order by created desc limit 5;
```

To pause the campaign, push its pending rows into the future, e.g.
`update email_events set scheduled_for = scheduled_for + interval '1 day' where email_type = 'pro_50_off' and status = 'pending';`
To cancel it, set them to `skipped`.
