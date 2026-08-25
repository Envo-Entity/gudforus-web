# Others in Health Profile — Email Campaign

Announces the new "Others" free-text option in the health profile, letting users add
allergies and sensitivities that aren't in the preset lists.

## Status

**Not yet automated.** Only the HTML template exists. There is no scheduler edge
function deployed — `schedule-others-in-health-profile-emails` returns 404 on the
Supabase project as of 2026-08-25.

## Template

- **Source**: `email.html`
- **Subject**: TBD — not yet decided
- **Template variables**: `{{unsubscribe_url}}` only

This is an untargeted broadcast, not a personalized automation. It has no `{{name}}`
and no `<!-- SECTION: -->` conditional blocks, unlike `incomplete_profile`.

## Assets

Served from `gudforus.com`, backed by this repo's `public/` directory:

| URL | Repo path |
|---|---|
| `/email/others_in_health_profile/others_1.jpg` | `public/email/others_in_health_profile/others_1.jpg` |
| `/email/others_in_health_profile/others_2.jpg` | `public/email/others_in_health_profile/others_2.jpg` |
| `/email/appstore.svg`, `/email/playstore.svg` | shared across all campaigns |
| `/gud-green.png` | shared logo |

Source PNGs are not version-controlled here — they are kept locally, and a copy
also sits in the mobile repo at `email-campaigns/others-in-health-profile/originals/`.

**The web app must be deployed before any send** — the images have to be live at
`gudforus.com` first.

## Open decisions

1. **`email_type` value** — suggest `others_in_health_profile`.
2. **Suppression preference** — this is a product announcement, so it should gate on
   `email_preferences.product_updates_enabled`, *not* `newsletter_enabled` (which is
   what `incomplete_profile_automation` uses). Needs a case added to `isEligible()`.
3. **Audience** — all subscribed users, or only those with a filled `allergies`
   section in `profiles.onboarding_responses`?
4. **Subject line.**

## Sending pipeline

Lives in Supabase edge functions, which are **not in this repository** — see the
project-wide note. Wiring this campaign up requires:

- `shared/email-templates.ts` — add the template literal + render function
- `send-pending-emails/index.ts` — add `isEligible()` case + `buildEmail()` case
- `schedule-others-in-health-profile-emails/index.ts` — create, then deploy
- pg_cron entry to trigger the scheduler
