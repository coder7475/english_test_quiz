/**
 * Generates a unique transaction ID.
 * The ID consists of a timestamp and a random string for uniqueness.
 */
export function generateTransactionId(): string {
  const timestamp = Date.now().toString(36);
  const randomPart = Math.random().toString(36).substring(2, 10);
  return `txn_${timestamp}_${randomPart}`;
}
