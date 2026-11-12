# Others in Health Profile — Email Campaign

Announces the new "Others" free-text option in the health profile, letting users add
allergies and sensitivities that aren't in the preset lists.

## Status

**Paused (12 Nov 2026).** Ran daily from 20 Aug to 11 Nov 2026 and sent 721 emails
(681 clean, plus 40 that went out despite a 429 retry error on 27 Aug). 74 failed
because they were `@example.com` addresses.

The daily scheduler (pg_cron job 31, `others-in-health-profile-emails-daily`) is set to
`active = false` so it stops using the shared daily email cap while `new_look` sends.
The function is still deployed. To resume:

```sql
select cron.alter_job(job_id := 31, active := true);
```

When running, `schedule-others-in-health-profile-emails` queues up to 50 eligible users
a day, and stops naturally once everyone eligible has been sent the campaign.

## Template

- **Source**: `email.html`
- **Subject**: `Hi {{name}}, Any Health Condition, we got you!`
- **Template variables**: `{{name}}` for the personalized subject and `{{unsubscribe_url}}`

The scheduler targets all app users who have an email and have not already been
queued or sent this campaign, while honoring `subscribed` and
`product_updates_enabled`. It has no `<!-- SECTION: -->` conditional blocks,
unlike `incomplete_profile`.

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

## Sending pipeline

The scheduler source is in `supabase/functions/schedule-others-in-health-profile-emails/`.
The sender and shared templates are in `supabase/functions/` too. The production
wiring is:

- `schedule-others-in-health-profile-emails` — pg_cron job 31, daily at 10:30 UTC / 4:00 PM IST
  (currently paused, see Status)
- `send-pending-emails` — pg_cron job 27, every 5 minutes, 10 sends per run, at most 95 sends
  in any 24h shared across all email types
- The scheduler source in this repo is identical to the deployed v4 (checked 12 Nov 2026)
- `email_events` — queue with `email_type = 'others_in_health_profile'`
