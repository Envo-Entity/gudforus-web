/**
 * Send Pending Emails Edge Function
 *
 * Purpose: Processes email_events with status='pending' and sends via Resend API.
 *
 * Trigger: pg_cron job 27 ("send-pending-emails"), every 5 minutes
 *
 * Supports two recipient types:
 *   • App users   — user_id set, email_preferences controls eligibility
 *   • Web visitors — subscriber_id set, newsletter_subscribers.subscribed controls eligibility
 *
 * Flow:
 *   1. Count emails sent in the last 24h (daily cap: Resend free plan allows 100/day)
 *   2. Fetch due pending welcome emails first (always allowed), then fill the rest of the
 *      run (limit 10) with other due emails only while the 24h total is under DAILY_SEND_CAP.
 *      Held emails stay 'pending' untouched.
 *   3. Filter by preferences (email_preferences for app users, newsletter_subscribers for web visitors)
 *   4. Fetch display name for personalisation
 *   5. Build email payload per email_type with signed unsubscribe URL
 *   6. Send via Resend API (parallel, individual calls started 150ms apart)
 *   7. On success: status → 'sent', store resend_id in metadata
 *   8. On Resend daily/monthly quota error: stay 'pending', no attempt counted,
 *      scheduled_for → next 04:30 UTC (10:00 IST)
 *   9. On other failure: increment attempts + linear backoff, or mark 'failed' after 3 attempts
 */

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { getCorsHeaders, handleCors } from "../shared/cors.ts";
import { generateRequestId, handleError } from "../shared/error-handler.ts";
import {
  renderWelcomeEmail,
  renderNewsletterEmail,
  renderOthersInHealthProfileEmail,
  renderPro50OffEmail,
  renderNewLookEmail,
  type NewLookVariant,
} from "../shared/email-templates.ts";
import { buildUnsubscribeUrl } from "../shared/email-utils.ts";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const INTERNAL_SECRET = Deno.env.get("EMAIL_SECRET")!;
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")!;
// When set, ALL emails are routed here regardless of the real recipient.
// Remove this secret from Supabase to go to production.
const TEST_EMAIL_OVERRIDE = Deno.env.get("TEST_EMAIL_OVERRIDE") ?? null;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY || !INTERNAL_SECRET || !RESEND_API_KEY) {
  throw new Error("Missing required environment variables");
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

const FROM_ADDRESS = "Gudforus <hi@gudforus.com>";
const RESEND_URL = "https://api.resend.com/emails";
const UNSUBSCRIBE_BASE = "https://gudforus.com/unsubscribe";

const MAX_PER_RUN = 10;
const MAX_ATTEMPTS = 3;
const BACKOFF_MINUTES = 5;
// Resend allows 10 requests/second; starting sends 150ms apart keeps a full run under it.
const SEND_SPACING_MS = 150;
// Resend free plan: 100 emails/day. Above this many sends in the trailing 24h,
// only welcome emails go out; everything else waits in the queue.
const DAILY_SEND_CAP = 95;
// Next send window after a Resend quota error: 04:30 UTC = 10:00 IST.
const QUOTA_RETRY_HOUR_UTC = 4;
const QUOTA_RETRY_MINUTE_UTC = 30;

// ─── Types ────────────────────────────────────────────────────────────────────

interface PendingEmail {
  id: string;
  user_id: string | null;
  subscriber_id: string | null;
  email_type: string;
  recipient: string;
  attempts: number;
  metadata: Record<string, unknown> | null;
}

interface EmailPrefs {
  user_id: string;
  subscribed: boolean;
  welcome_email_enabled: boolean;
  newsletter_enabled: boolean;
  product_updates_enabled: boolean;
}

interface NewsletterSubscriber {
  id: string;
  email: string;
  name: string | null;
  subscribed: boolean;
}

interface ResendPayload {
  from: string;
  to: string[];
  subject: string;
  html: string;
  headers?: Record<string, string>;
}

interface SendResult {
  eventId: string;
  success: boolean;
  resendId?: string;
  error?: string;
  deferred?: boolean; // Resend quota hit: rescheduled, no attempt counted
}

class ResendError extends Error {
  status: number;
  code: string | null; // Resend error `name`, e.g. "rate_limit_exceeded", "daily_quota_exceeded"

  constructor(message: string, status: number, code: string | null) {
    super(message);
    this.status = status;
    this.code = code;
  }
}

// Daily/monthly sending quota (a 429 like the per-second rate limit, but retrying
// minutes later won't help). Matched by name and message, not status.
function isQuotaError(err: unknown): boolean {
  if (!(err instanceof ResendError)) return false;
  if (err.code && /quota/i.test(err.code)) return true;
  return /quota/i.test(err.message) && !/per second/i.test(err.message);
}

function nextQuotaRetryAt(): string {
  const next = new Date();
  next.setUTCHours(QUOTA_RETRY_HOUR_UTC, QUOTA_RETRY_MINUTE_UTC, 0, 0);
  if (next.getTime() <= Date.now()) next.setUTCDate(next.getUTCDate() + 1);
  return next.toISOString();
}

// ─── Eligibility checks ───────────────────────────────────────────────────────

function isEligibleAppUser(emailType: string, prefs: EmailPrefs | undefined): boolean {
  if (!prefs) return true; // No row = default subscribed
  if (!prefs.subscribed) return false;
  if (emailType === "welcome" && !prefs.welcome_email_enabled) return false;
  if (emailType === "newsletter" && !prefs.newsletter_enabled) return false;
  if (emailType === "product_updates" && !prefs.product_updates_enabled) return false;
  if (emailType === "others_in_health_profile" && !prefs.product_updates_enabled) return false;
  if (emailType === "pro_50_off" && !prefs.newsletter_enabled) return false;
  if (emailType === "new_look" && !prefs.product_updates_enabled) return false;
  return true;
}

// Apple "Hide My Email" relay addresses bounce unless hi@gudforus.com is registered in
// Apple Developer (Sign in with Apple for Email Communication). Until it is, never send
// to them: the row is marked 'skipped' with last_error 'apple_private_relay'.
// Set to false once registered, then redeploy.
const BLOCK_APPLE_PRIVATE_RELAY = true;

function isApplePrivateRelay(recipient: string): boolean {
  return /@privaterelay\.appleid\.com$/i.test(recipient.trim());
}

// "new_look" has two versions of its copy (see NEW_LOOK_COPY in shared/email-templates.ts):
//   lapsed — hasn't opened the app in 7+ days ("it's been a while", "missed you")
//   active — opened the app in the last 7 days
// The version is picked when the email is SENT, from profiles.last_seen_at (the app updates
// it on launch, sign-in and every return to the foreground), so nobody gets "missed you"
// right after opening the app. metadata.variant ("lapsed" | "active") forces one, for tests.
// The version sent is recorded in metadata.variant_sent.
const ACTIVE_WINDOW_MS = 7 * 24 * 60 * 60 * 1000;

function isRecentlyActive(lastSeenAt: string | null | undefined): boolean {
  if (!lastSeenAt) return false;
  const t = Date.parse(lastSeenAt);
  return Number.isFinite(t) && Date.now() - t < ACTIVE_WINDOW_MS;
}

function pickNewLookVariant(row: PendingEmail, lastSeenAt: string | null): NewLookVariant {
  const forced = row.metadata?.variant;
  if (forced === "lapsed" || forced === "active") return forced;
  return isRecentlyActive(lastSeenAt) ? "active" : "lapsed";
}

function isEligibleSubscriber(subscriber: NewsletterSubscriber | undefined): boolean {
  if (!subscriber) return false; // Row must exist
  return subscriber.subscribed;
}

// ─── Email builder ────────────────────────────────────────────────────────────

async function buildEmail(
  row: PendingEmail,
  displayName: string | null,
  newLookVariant: NewLookVariant = "lapsed",
): Promise<ResendPayload | null> {
  const firstName = (displayName ?? row.recipient.split("@")[0]).split(" ")[0];

  // Build unsubscribe URL — app users get uid, web visitors get sid
  const unsubscribeUrl = row.user_id
    ? await buildUnsubscribeUrl(UNSUBSCRIBE_BASE, row.recipient, row.user_id, INTERNAL_SECRET)
    : await buildUnsubscribeUrl(UNSUBSCRIBE_BASE, row.recipient, row.subscriber_id!, INTERNAL_SECRET, true);

  switch (row.email_type) {
    case "welcome": {
      const { subject, html } = renderWelcomeEmail(firstName, unsubscribeUrl);
      return {
        from: FROM_ADDRESS,
        to: [row.recipient],
        subject,
        html,
        headers: {
          "List-Unsubscribe": `<${unsubscribeUrl}>, <mailto:unsubscribe@gudforus.com?subject=unsubscribe>`,
          "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
        },
      };
    }

    case "newsletter": {
      const meta = row.metadata ?? {};
      const subject = (meta.subject as string) ?? "From Gudforus";
      const bodyHtml = (meta.body_html as string) ?? "<p>Stay tuned for more updates.</p>";
      const issueLabel = (meta.issue_label as string) ?? undefined;
      const { subject: subj, html } = renderNewsletterEmail(
        firstName, subject, bodyHtml, unsubscribeUrl, issueLabel,
      );
      return {
        from: FROM_ADDRESS,
        to: [row.recipient],
        subject: subj,
        html,
        headers: {
          "List-Unsubscribe": `<${unsubscribeUrl}>, <mailto:unsubscribe@gudforus.com?subject=unsubscribe>`,
          "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
        },
      };
    }

    case "others_in_health_profile": {
      const { subject, html } = renderOthersInHealthProfileEmail(firstName, unsubscribeUrl);
      return {
        from: FROM_ADDRESS,
        to: [row.recipient],
        subject,
        html,
        headers: {
          "List-Unsubscribe": `<${unsubscribeUrl}>, <mailto:unsubscribe@gudforus.com?subject=unsubscribe>`,
          "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
        },
      };
    }

    case "pro_50_off": {
      const { subject, html } = renderPro50OffEmail(firstName, unsubscribeUrl);
      return {
        from: FROM_ADDRESS,
        to: [row.recipient],
        subject,
        html,
        headers: {
          "List-Unsubscribe": `<${unsubscribeUrl}>, <mailto:unsubscribe@gudforus.com?subject=unsubscribe>`,
          "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
        },
      };
    }

    case "new_look": {
      const { subject, html } = renderNewLookEmail(firstName, unsubscribeUrl, newLookVariant);
      return {
        from: FROM_ADDRESS,
        to: [row.recipient],
        subject,
        html,
        headers: {
          "List-Unsubscribe": `<${unsubscribeUrl}>, <mailto:unsubscribe@gudforus.com?subject=unsubscribe>`,
          "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
        },
      };
    }

    default:
      console.warn(`[SendEmails] Unknown email_type: ${row.email_type} — skipping`);
      return null;
  }
}

// ─── Resend send ──────────────────────────────────────────────────────────────

async function sendViaResend(payload: ResendPayload): Promise<string> {
  const response = await fetch(RESEND_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const json = await response.json();

  if (!response.ok) {
    throw new ResendError(
      `Resend error ${response.status}: ${json.message ?? JSON.stringify(json)}`,
      response.status,
      typeof json.name === "string" ? json.name : null,
    );
  }

  return json.id as string;
}

// ─── Process a single pending email ──────────────────────────────────────────

async function processEmail(
  row: PendingEmail,
  displayName: string | null,
  lastSeenAt: string | null,
): Promise<SendResult> {
  const variant = row.email_type === "new_look" ? pickNewLookVariant(row, lastSeenAt) : undefined;
  const payload = await buildEmail(row, displayName, variant);

  if (!payload) {
    await supabase
      .from("email_events")
      .update({ status: "skipped", last_error: "unknown email_type" })
      .eq("id", row.id);
    return { eventId: row.id, success: false, error: "skipped: unknown type" };
  }

  if (TEST_EMAIL_OVERRIDE) {
    console.log(
      `[SendEmails] TEST_EMAIL_OVERRIDE active — routing ${payload.to[0]} → ${TEST_EMAIL_OVERRIDE}`,
    );
    payload.to = [TEST_EMAIL_OVERRIDE];
  }

  try {
    const resendId = await sendViaResend(payload);

    await supabase
      .from("email_events")
      .update({
        status: "sent",
        sent_at: new Date().toISOString(),
        metadata: {
          ...(row.metadata ?? {}),
          resend_id: resendId,
          ...(variant ? { variant_sent: variant } : {}),
          ...(TEST_EMAIL_OVERRIDE ? { test_override: true } : {}),
        },
      })
      .eq("id", row.id);

    return { eventId: row.id, success: true, resendId };
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err);

    if (isQuotaError(err)) {
      await supabase
        .from("email_events")
        .update({ last_error: errorMessage, scheduled_for: nextQuotaRetryAt() })
        .eq("id", row.id);
      return { eventId: row.id, success: false, deferred: true, error: errorMessage };
    }

    const nextAttempts = row.attempts + 1;
    const isPermanentFailure = nextAttempts >= MAX_ATTEMPTS;

    if (isPermanentFailure) {
      await supabase
        .from("email_events")
        .update({ status: "failed", attempts: nextAttempts, last_error: errorMessage })
        .eq("id", row.id);
    } else {
      const backoffMs = nextAttempts * BACKOFF_MINUTES * 60 * 1000;
      const nextScheduledFor = new Date(Date.now() + backoffMs).toISOString();
      await supabase
        .from("email_events")
        .update({ attempts: nextAttempts, last_error: errorMessage, scheduled_for: nextScheduledFor })
        .eq("id", row.id);
    }

    return { eventId: row.id, success: false, error: errorMessage };
  }
}

// ─── Main handler ─────────────────────────────────────────────────────────────

serve(async (req) => {
  const requestId = generateRequestId();
  const corsHeaders = getCorsHeaders(req.headers.get("Origin"));
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

  try {
    const internalSecret = req.headers.get("X-Internal-Secret");
    if (!internalSecret || internalSecret !== INTERNAL_SECRET) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log("[SendEmails] Run started", { requestId });

    // ── 1. Daily cap: how many emails went out in the trailing 24h ──
    const now = new Date().toISOString();
    const dayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    const { count: sentCount, error: countError } = await supabase
      .from("email_events")
      .select("id", { count: "exact", head: true })
      .eq("status", "sent")
      .gt("sent_at", dayAgo);

    if (countError) throw new Error(`Failed to count sent emails: ${countError.message}`);
    const sentLast24h = sentCount ?? 0;

    // ── 2. Fetch due emails: welcome first (never capped), then others within the cap ──
    const columns = "id, user_id, subscriber_id, email_type, recipient, attempts, metadata";
    const { data: welcomeRows, error: welcomeError } = await supabase
      .from("email_events")
      .select(columns)
      .eq("status", "pending")
      .eq("email_type", "welcome")
      .lte("scheduled_for", now)
      .order("created_at", { ascending: true })
      .limit(MAX_PER_RUN);

    if (welcomeError) throw new Error(`Failed to fetch pending emails: ${welcomeError.message}`);

    const welcomeCount = welcomeRows?.length ?? 0;
    const otherSlots = Math.min(
      MAX_PER_RUN - welcomeCount,
      DAILY_SEND_CAP - sentLast24h - welcomeCount,
    );

    let otherRows: PendingEmail[] = [];
    if (otherSlots > 0) {
      const { data, error: otherError } = await supabase
        .from("email_events")
        .select(columns)
        .eq("status", "pending")
        .neq("email_type", "welcome")
        .lte("scheduled_for", now)
        .order("created_at", { ascending: true })
        .limit(otherSlots);

      if (otherError) throw new Error(`Failed to fetch pending emails: ${otherError.message}`);
      otherRows = data ?? [];
    } else if (sentLast24h + welcomeCount >= DAILY_SEND_CAP) {
      console.log(
        `[SendEmails] Daily cap reached (${sentLast24h} sent in last 24h, cap ${DAILY_SEND_CAP}) — holding non-welcome emails`,
      );
    }

    const pendingRows: PendingEmail[] = [...(welcomeRows ?? []), ...otherRows];

    if (pendingRows.length === 0) {
      console.log("[SendEmails] No pending emails. Exiting.");
      return new Response(JSON.stringify({ success: true, processed: 0, sent_last_24h: sentLast24h }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log(`[SendEmails] Found ${pendingRows.length} pending email(s)`);

    // Split rows by recipient type
    const appUserRows = pendingRows.filter((r: PendingEmail) => r.user_id !== null);
    const subscriberRows = pendingRows.filter((r: PendingEmail) => r.subscriber_id !== null);

    const userIds = [...new Set(appUserRows.map((r: PendingEmail) => r.user_id as string))];
    const subscriberIds = [...new Set(subscriberRows.map((r: PendingEmail) => r.subscriber_id as string))];

    // ── 3. Fetch preferences + names in parallel ──
    const [prefsResult, profilesResult, subscribersResult] = await Promise.all([
      userIds.length > 0
        ? supabase
            .from("email_preferences")
            .select("user_id, subscribed, welcome_email_enabled, newsletter_enabled, product_updates_enabled")
            .in("user_id", userIds)
        : Promise.resolve({ data: [], error: null }),
      userIds.length > 0
        ? supabase.from("profiles").select("id, display_name, last_seen_at").in("id", userIds)
        : Promise.resolve({ data: [], error: null }),
      subscriberIds.length > 0
        ? supabase
            .from("newsletter_subscribers")
            .select("id, email, name, subscribed")
            .in("id", subscriberIds)
        : Promise.resolve({ data: [], error: null }),
    ]);

    const prefsByUser = new Map<string, EmailPrefs>();
    for (const p of prefsResult.data ?? []) prefsByUser.set(p.user_id, p as EmailPrefs);

    const nameByUser = new Map<string, string | null>();
    const lastSeenByUser = new Map<string, string | null>();
    for (const p of profilesResult.data ?? []) {
      nameByUser.set(p.id, p.display_name ?? null);
      lastSeenByUser.set(p.id, (p as { last_seen_at?: string | null }).last_seen_at ?? null);
    }

    const subscribersById = new Map<string, NewsletterSubscriber>();
    for (const s of subscribersResult.data ?? []) subscribersById.set(s.id, s as NewsletterSubscriber);

    // ── 4. Separate eligible from suppressed ──
    const eligible: PendingEmail[] = [];
    const suppressed: PendingEmail[] = [];
    const relayBlocked: PendingEmail[] = [];

    for (const row of pendingRows as PendingEmail[]) {
      if (BLOCK_APPLE_PRIVATE_RELAY && isApplePrivateRelay(row.recipient)) {
        relayBlocked.push(row);
        continue;
      }
      let ok: boolean;
      if (row.user_id) {
        ok = isEligibleAppUser(row.email_type, prefsByUser.get(row.user_id));
      } else {
        ok = isEligibleSubscriber(subscribersById.get(row.subscriber_id!));
      }
      if (ok) eligible.push(row); else suppressed.push(row);
    }

    if (suppressed.length > 0) {
      await supabase
        .from("email_events")
        .update({ status: "skipped", last_error: "unsubscribed" })
        .in("id", suppressed.map((r) => r.id));
      console.log(`[SendEmails] Skipped ${suppressed.length} suppressed email(s)`);
    }

    if (relayBlocked.length > 0) {
      await supabase
        .from("email_events")
        .update({ status: "skipped", last_error: "apple_private_relay" })
        .in("id", relayBlocked.map((r) => r.id));
      console.log(`[SendEmails] Skipped ${relayBlocked.length} Apple private relay email(s)`);
    }

    const skippedBeforeSend = suppressed.length + relayBlocked.length;

    if (eligible.length === 0) {
      return new Response(
        JSON.stringify({ success: true, processed: 0, skipped: skippedBeforeSend, sent_last_24h: sentLast24h }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // ── 5. Resolve display names for eligible rows ──
    const getDisplayName = (row: PendingEmail): string | null => {
      if (row.user_id) return nameByUser.get(row.user_id) ?? null;
      return subscribersById.get(row.subscriber_id!)?.name ?? null;
    };

    // ── 6. Send eligible emails in parallel, starts spaced out for Resend's rate limit ──
    const tasks = eligible.map((row, i) =>
      new Promise((resolve) => setTimeout(resolve, i * SEND_SPACING_MS))
        .then(() =>
          processEmail(
            row,
            getDisplayName(row),
            row.user_id ? (lastSeenByUser.get(row.user_id) ?? null) : null,
          )
        )
    );
    const results = await Promise.allSettled(tasks);

    // ── 7. Summarise ──
    let sent = 0, failed = 0, skipped = 0, deferred = 0;
    for (const result of results) {
      if (result.status === "fulfilled") {
        if (result.value.success) sent++;
        else if (result.value.deferred) deferred++;
        else if (result.value.error?.startsWith("skipped")) skipped++;
        else failed++;
      } else {
        failed++;
        console.error("[SendEmails] Unhandled task rejection:", result.reason);
      }
    }

    const summary = {
      success: true,
      total: pendingRows.length,
      sent,
      failed,
      skipped: skipped + skippedBeforeSend,
      deferred,
      sent_last_24h: sentLast24h,
    };

    console.log("[SendEmails] Run complete:", summary);

    return new Response(JSON.stringify(summary), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("[SendEmails] Unhandled error:", { requestId, error });
    const { status, body } = handleError(error, requestId);
    return new Response(JSON.stringify(body), {
      status,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
