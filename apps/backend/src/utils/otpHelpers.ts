import crypto from "crypto";

export const OTP_EXPIRATION = 5 * 60 // 5 minutes

export const generateOtp = (length = 6) => {
    //generate 6 digit otp
    const otp = crypto.randomInt(10 ** (length - 1), 10 ** length).toString()
    return otp
}

