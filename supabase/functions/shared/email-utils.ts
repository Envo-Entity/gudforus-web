const ENCODER = new TextEncoder();

async function getHmacKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    ENCODER.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
}

/**
 * Signs `message` with HMAC-SHA256 and returns a lowercase hex string.
 */
export async function signToken(secret: string, message: string): Promise<string> {
  const key = await getHmacKey(secret);
  const sig = await crypto.subtle.sign("HMAC", key, ENCODER.encode(message));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/**
 * Constant-time comparison to prevent timing attacks.
 */
export async function verifyToken(
  secret: string,
  message: string,
  token: string,
): Promise<boolean> {
  const expected = await signToken(secret, message);
  if (expected.length !== token.length) return false;
  let diff = 0;
  for (let i = 0; i < expected.length; i++) {
    diff |= expected.charCodeAt(i) ^ token.charCodeAt(i);
  }
  return diff === 0;
}

/**
 * Builds a signed unsubscribe URL.
 *
 * App users:       uid param → unsubscribe updates email_preferences
 * Web subscribers: sid param → unsubscribe updates newsletter_subscribers
 *
 * Token always signs the email address for verification.
 */
export async function buildUnsubscribeUrl(
  baseUrl: string,
  email: string,
  id: string,
  secret: string,
  isSubscriber = false,
): Promise<string> {
  const token = await signToken(secret, email);
  const params = new URLSearchParams({
    token,
    email,
    [isSubscriber ? "sid" : "uid"]: id,
  });
  return `${baseUrl}?${params.toString()}`;
}
