// Web Crypto HMAC-SHA256 Session Signing & Verification
// Compatible with both Next.js Edge Middleware and Node.js Runtime

export interface SessionPayload {
  sub: string;
  user: string;
  role: "admin" | "staff";
  name: string;
  exp: number; // Unix timestamp in ms
  iat: number; // Unix timestamp in ms
}

const DEFAULT_SECRET = process.env.SESSION_SECRET || "fixar_production_secure_signing_key_2026_middle_east_hvac";

// Convert string to Uint8Array
function stringToUint8Array(str: string): Uint8Array {
  return new TextEncoder().encode(str);
}

// Convert ArrayBuffer to URL-safe Base64
function arrayBufferToBase64Url(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

// Convert URL-safe Base64 to Uint8Array
function base64UrlToUint8Array(base64url: string): Uint8Array {
  let base64 = base64url.replace(/-/g, "+").replace(/_/g, "/");
  while (base64.length % 4 !== 0) {
    base64 += "=";
  }
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

// Get or import HMAC key
async function getCryptoKey(secret: string): Promise<CryptoKey> {
  const keyData = stringToUint8Array(secret);
  return crypto.subtle.importKey(
    "raw",
    keyData as unknown as BufferSource,
    { name: "HMAC", hash: { name: "SHA-256" } },
    false,
    ["sign", "verify"]
  );
}

/**
 * Sign a session payload with HMAC-SHA256
 */
export async function signSessionToken(
  payload: Omit<SessionPayload, "iat" | "exp">,
  expiresInMs = 1000 * 60 * 60 * 24 * 7 // 7 days
): Promise<string> {
  const now = Date.now();
  const fullPayload: SessionPayload = {
    ...payload,
    iat: now,
    exp: now + expiresInMs,
  };

  const payloadString = JSON.stringify(fullPayload);
  const payloadBase64 = arrayBufferToBase64Url(stringToUint8Array(payloadString).buffer as ArrayBuffer);

  const key = await getCryptoKey(DEFAULT_SECRET);
  const signatureBuffer = await crypto.subtle.sign(
    "HMAC",
    key,
    stringToUint8Array(payloadBase64) as unknown as BufferSource
  );
  const signatureBase64 = arrayBufferToBase64Url(signatureBuffer);

  return `${payloadBase64}.${signatureBase64}`;
}

/**
 * Verify an HMAC-SHA256 session token
 * Returns payload if valid and not expired, null otherwise
 */
export async function verifySessionToken(token: string | null | undefined): Promise<SessionPayload | null> {
  if (!token || typeof token !== "string") return null;

  const parts = token.split(".");
  if (parts.length !== 2) {
    // Backward compatibility for legacy base64 json token without signature
    try {
      const decoded = atob(token.replace(/-/g, "+").replace(/_/g, "/"));
      if (decoded.startsWith("{")) {
        const parsed = JSON.parse(decoded);
        if (parsed.role && parsed.user) {
          return {
            sub: parsed.user,
            user: parsed.user,
            role: parsed.role,
            name: parsed.name || "Authorized User",
            iat: parsed.issuedAt || Date.now() - 1000,
            exp: Date.now() + 1000 * 60 * 60 * 24,
          };
        }
      }
    } catch {}
    return null;
  }

  const [payloadBase64, signatureBase64] = parts;

  try {
    const key = await getCryptoKey(DEFAULT_SECRET);
    const signatureBytes = base64UrlToUint8Array(signatureBase64);

    const isValid = await crypto.subtle.verify(
      "HMAC",
      key,
      signatureBytes as unknown as BufferSource,
      stringToUint8Array(payloadBase64) as unknown as BufferSource
    );

    if (!isValid) return null;

    const payloadBytes = base64UrlToUint8Array(payloadBase64);
    const payloadJson = new TextDecoder().decode(payloadBytes);
    const payload: SessionPayload = JSON.parse(payloadJson);

    // Check expiration
    if (Date.now() > payload.exp) {
      return null;
    }

    return payload;
  } catch (err) {
    return null;
  }
}
