import { pbkdf2Sync, randomBytes, timingSafeEqual } from "node:crypto";

/**
 * Convert bcrypt-like cost to PBKDF2 iterations.
 * bcrypt uses 2^cost rounds.
 */
export function costToIterations(cost: number): number {
  if (!Number.isInteger(cost) || cost < 4 || cost > 20) {
    throw new Error("Cost must be an integer between 4 and 20");
  }
  return 2 ** cost;
}

const SALT_BYTE_SIZE = 16; // 16 bytes ~ bcrypt
const HASH_BYTE_SIZE = 32; // 32 bytes hash
const DIGEST = "sha256";
const PREFIX = "$purebcrypt$";

/**
 * Hash a password with dynamic salt and cost factor.
 * @param password - plaintext password
 * @param cost - cost factor (default: 12)
 * @returns hash string to store in DB
 */
export function hashPassword(password: string, cost: number = 12): string {
  const salt = randomBytes(SALT_BYTE_SIZE).toString("hex");
  const iterations = costToIterations(cost);
  // generate the hashed value
  const hash = pbkdf2Sync(
    password,
    salt,
    iterations,
    HASH_BYTE_SIZE,
    DIGEST,
  ).toString("hex");

  return `${PREFIX}${cost}$${salt}$${hash}`;
}

/**
 * Verify a password against stored hash.
 * @param password - plaintext password
 * @param storedHash - hash returned by hashPassword()
 * @returns true if password matches
 */
export function verifyPassword(password: string, storedHash: string): boolean {
  if (!storedHash.startsWith(PREFIX)) {
    throw new Error("Invalid hash format");
  }
  const parts = storedHash.slice(PREFIX.length).split("$");
  if (parts.length !== 3) {
    throw new Error("Invalid hash format");
  }

  const [costStr, salt, originalHash] = parts;
  if (!costStr || !salt || !originalHash) {
    throw new Error("Invalid hash format");
  }

  const cost = parseInt(costStr, 10);
  if (isNaN(cost)) {
    throw new Error("Invalid cost factor in hash");
  }

  const iterations = costToIterations(cost);
  const hash = pbkdf2Sync(
    password,
    salt,
    iterations,
    Buffer.from(originalHash, "hex").length,
    DIGEST,
  ).toString("hex");

  return timingSafeEqual(
    Buffer.from(hash, "hex"),
    Buffer.from(originalHash, "hex"),
  );
}

/**
 * Compare old password and new password.
 * @param oldPassword - The old password (plaintext)
 * @param newPassword - The new password (plaintext)
 * @returns true if passwords are different, false if they are the same
 */
export function isPasswordChanged(
  oldPassword: string,
  newPassword: string,
): boolean {
  return oldPassword !== newPassword;
}
