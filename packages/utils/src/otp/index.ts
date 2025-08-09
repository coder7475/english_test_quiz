import { randomInt } from "node:crypto";

type OtpType = "numeric" | "alphanumeric" | "hex";

export interface GenerateOtpOptions {
  length?: number;
  type?: OtpType;
}

/**
 * Generates a secure One-Time Password (OTP).
 * @param options - Options to configure the OTP.
 * @returns OTP string.
 */
export function generateOtp(options: GenerateOtpOptions = {}): string {
  const { length = 6, type = "numeric" } = options;

  if (length <= 0) {
    throw new Error("OTP length must be a positive integer");
  }

  let charset: string;
  switch (type) {
    case "numeric":
      charset = "0123456789";
      break;
    case "alphanumeric":
      charset =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      break;
    case "hex":
      charset = "abcdef0123456789";
      break;
    default:
      throw new Error(`Invalid OTP type: ${type}`);
  }

  let otp = "";
  for (let i = 0; i < length; i++) {
    // crypto.randomInt ensures a valid index into charset
    const idx = randomInt(0, charset.length);
    otp += charset[idx];
  }

  return otp;
}
