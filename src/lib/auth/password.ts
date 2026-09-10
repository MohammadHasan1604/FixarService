// Web Crypto PBKDF2 Password Hashing & Verification
// 100,000 iterations with HMAC-SHA256, cryptographically secure 16-byte random salt

const ITERATIONS = 100000;
const KEY_LENGTH = 32; // 256 bits

function bufferToHex(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function hexToBuffer(hex: string): Uint8Array {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(hex.substr(i * 2, 2), 16);
  }
  return bytes;
}

/**
 * Hash a password using PBKDF2 with SHA-256
 * Returns string format: salt:hash
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const enc = new TextEncoder();
  const passwordKey = await crypto.subtle.importKey(
    "raw",
    enc.encode(password),
    { name: "PBKDF2" },
    false,
    ["deriveBits"]
  );

  const derivedBits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt: salt as unknown as BufferSource,
      iterations: ITERATIONS,
      hash: "SHA-256",
    },
    passwordKey,
    KEY_LENGTH * 8
  );

  const saltHex = bufferToHex(salt.buffer as ArrayBuffer);
  const hashHex = bufferToHex(derivedBits);

  return `${saltHex}:${hashHex}`;
}

/**
 * Verify a candidate password against a stored hash
 * Supports PBKDF2 'salt:hash' format as well as backward-compatible direct match during transition
 */
export async function verifyPassword(password: string, storedHashOrPlain: string): Promise<boolean> {
  if (!password || !storedHashOrPlain) return false;

  // Check PBKDF2 format
  if (storedHashOrPlain.includes(":")) {
    const [saltHex, hashHex] = storedHashOrPlain.split(":");
    if (saltHex && hashHex) {
      try {
        const salt = hexToBuffer(saltHex);
        const enc = new TextEncoder();
        const passwordKey = await crypto.subtle.importKey(
          "raw",
          enc.encode(password),
          { name: "PBKDF2" },
          false,
          ["deriveBits"]
        );

        const derivedBits = await crypto.subtle.deriveBits(
          {
            name: "PBKDF2",
            salt: salt as unknown as BufferSource,
            iterations: ITERATIONS,
            hash: "SHA-256",
          },
          passwordKey,
          KEY_LENGTH * 8
        );

        const candidateHashHex = bufferToHex(derivedBits);
        return candidateHashHex === hashHex;
      } catch (err) {
        return false;
      }
    }
  }

  // Fallback for transition matching
  return password === storedHashOrPlain;
}
