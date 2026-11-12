import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
const INTERNAL_SECRET = Deno.env.get(
  "OTHERS_IN_HEALTH_PROFILE_SCHEDULER_SECRET",
);

if (!SUPABASE_URL || !SERVICE_ROLE_KEY || !INTERNAL_SECRET) {
  throw new Error("Missing required environment variables");
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);
const EMAIL_TYPE = "others_in_health_profile";
const BATCH_LIMIT = 50;

type AuthUser = {
  id: string;
  email?: string | null;
  created_at?: string;
  deleted_at?: string | null;
};

type EmailPreference = {
  user_id: string;
  subscribed: boolean;
  product_updates_enabled: boolean;
};

type ExistingEmailEvent = {
  user_id: string | null;
  status: string;
};

const JSON_HEADERS = {
  "Content-Type": "application/json",
};

function jsonResponse(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: JSON_HEADERS,
  });
}

async function loadPreferences(userIds: string[]): Promise<EmailPreference[]> {
  const preferences: EmailPreference[] = [];

  for (let offset = 0; offset < userIds.length; offset += 100) {
    const { data, error } = await supabase
      .from("email_preferences")
      .select("user_id, subscribed, product_updates_enabled")
      .in("user_id", userIds.slice(offset, offset + 100));

    if (error) {
      throw new Error(`Unable to load email preferences: ${error.message}`);
    }

    preferences.push(...((data ?? []) as EmailPreference[]));
  }

  return preferences;
}

async function loadExistingEvents(
  userIds: string[],
): Promise<ExistingEmailEvent[]> {
  const events: ExistingEmailEvent[] = [];

  for (let offset = 0; offset < userIds.length; offset += 100) {
    const { data, error } = await supabase
      .from("email_events")
      .select("user_id, status")
      .eq("email_type", EMAIL_TYPE)
      .in("user_id", userIds.slice(offset, offset + 100))
      .in("status", ["pending", "sent"]);

    if (error) {
      throw new Error(`Unable to load email events: ${error.message}`);
    }

    events.push(...((data ?? []) as ExistingEmailEvent[]));
  }

  return events;
}

serve(async (request) => {
  if (request.method === "OPTIONS") {
    return new Response("ok", { headers: JSON_HEADERS });
  }

  if (request.headers.get("X-Internal-Secret") !== INTERNAL_SECRET) {
    return jsonResponse({ error: "Unauthorized" }, 401);
  }

  try {
    const allUsers: AuthUser[] = [];

    for (let page = 1; ; page += 1) {
      const { data, error } = await supabase.auth.admin.listUsers({
        page,
        perPage: 1000,
      });

      if (error) {
        throw new Error(`Unable to list auth users: ${error.message}`);
      }

      const pageUsers = (data?.users ?? []) as AuthUser[];
      allUsers.push(...pageUsers);

      if (pageUsers.length < 1000) {
        break;
      }
    }

    const users = allUsers.filter(
      (user) => Boolean(user.email?.trim()) && !user.deleted_at,
    );
    const userIds = users.map((user) => user.id);

    if (userIds.length === 0) {
      return jsonResponse({
        success: true,
        scheduled: 0,
        eligible_count: 0,
        remaining_count: 0,
      });
    }

    const [preferences, existingEvents] = await Promise.all([
      loadPreferences(userIds),
      loadExistingEvents(userIds),
    ]);

    const preferencesByUser = new Map(
      ((preferences ?? []) as EmailPreference[]).map((preference) => [
        preference.user_id,
        preference,
      ]),
    );
    const alreadyQueuedOrSent = new Set(
      (existingEvents ?? [])
        .map((event) => event.user_id)
        .filter((userId): userId is string => Boolean(userId)),
    );

    const eligibleUsers = users
      .filter((user) => {
        if (alreadyQueuedOrSent.has(user.id)) {
          return false;
        }

        const preference = preferencesByUser.get(user.id);
        return preference
          ? preference.subscribed && preference.product_updates_enabled
          : true;
      })
      .sort((left, right) => {
        const leftCreated = left.created_at ?? "";
        const rightCreated = right.created_at ?? "";
        return leftCreated.localeCompare(rightCreated) || left.id.localeCompare(right.id);
      });

    const batch = eligibleUsers.slice(0, BATCH_LIMIT);
    const scheduledAt = new Date().toISOString();

    if (batch.length > 0) {
      const { error: insertError } = await supabase.from("email_events").insert(
        batch.map((user) => ({
          user_id: user.id,
          email_type: EMAIL_TYPE,
          status: "pending",
          recipient: user.email!.trim(),
          scheduled_for: scheduledAt,
          metadata: {
            campaign: EMAIL_TYPE,
            triggered_by: "schedule-others-in-health-profile-emails",
            batch_limit: BATCH_LIMIT,
            scheduled_on: scheduledAt.slice(0, 10),
          },
        })),
      );

      if (insertError) {
        throw new Error(`Unable to queue newsletter emails: ${insertError.message}`);
      }
    }

    console.log(
      JSON.stringify({
        campaign: EMAIL_TYPE,
        eligible: eligibleUsers.length,
        scheduled: batch.length,
        remaining_after_batch: Math.max(eligibleUsers.length - batch.length, 0),
      }),
    );

    return jsonResponse({
      success: true,
      scheduled: batch.length,
      eligible_count: eligibleUsers.length,
      remaining_count: Math.max(eligibleUsers.length - batch.length, 0),
    });
  } catch (error) {
    console.error("[OthersInHealthProfileEmails] Scheduler failed:", error);
    return jsonResponse({
      error: error instanceof Error ? error.message : "Unknown error",
    }, 500);
  }
});
