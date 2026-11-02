/**
 * Secure CORS configuration for Supabase Edge Functions
 * Restricts access to known origins while supporting mobile apps
 */

// Environment-based allowed origins
const ALLOWED_ORIGINS = [
    // Production web app (if you have one)
    "https://com.app.gudforus",
    "https://com.app.gudforus.dev",
    "https://com.app.gudforus.preview",
    "https://gudforus.com",

    // Mobile apps (Capacitor/Ionic/React Native)
    "capacitor://localhost",
    "ionic://localhost",

    // Development
    "http://localhost:3000",
    "http://localhost:8080",
    "http://localhost:19006", // Expo web
    "exp://localhost:19000", // Expo dev
    "http://127.0.0.1:3000",
];

/**
 * Get CORS headers based on request origin
 * Allows native mobile apps (no origin) and whitelisted origins
 */
export function getCorsHeaders(
    requestOrigin: string | null,
): Record<string, string> {
    const origin = requestOrigin || "";

    // Check if origin is allowed
    const isAllowed = !origin || // Native mobile apps (no origin header)
        origin.startsWith("file://") || // Native apps using file protocol
        ALLOWED_ORIGINS.includes(origin) ||
        (Deno.env.get("ENVIRONMENT") === "development" &&
            (origin.includes("localhost") || origin.includes("127.0.0.1")));

    return {
        "Access-Control-Allow-Origin": isAllowed
            ? (origin || "*")
            : ALLOWED_ORIGINS[0],
        "Access-Control-Allow-Headers":
            "authorization, x-client-info, apikey, content-type, x-revenuecat-secret",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, PUT, DELETE",
        "Access-Control-Max-Age": "86400", // Cache preflight for 24 hours
    };
}

/**
 * Handle CORS preflight requests
 */
export function handleCors(req: Request): Response | null {
    if (req.method === "OPTIONS") {
        const origin = req.headers.get("Origin");
        return new Response("ok", { headers: getCorsHeaders(origin) });
    }
    return null;
}

// Legacy export for backward compatibility (will use first allowed origin)
export const corsHeaders = getCorsHeaders(null);
