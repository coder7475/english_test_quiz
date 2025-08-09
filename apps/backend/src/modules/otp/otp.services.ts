import AppError from "@/configs/AppError";
import { UserModel } from "../user/user.model";
import { generateOtp, OTP_EXPIRATION } from "@/utils/otpHelpers";
import { connectRedis, redisClient } from "@/configs/redis.config";
import { sendEmail } from "@/utils/sendEmail";

const sendOTP = async (email: string, name: string) => {

    const user = await UserModel.findOne({ email })

    if (!user) {
        throw new AppError(404, "User not found")
    }

    if (user.isVerified) {
        throw new AppError(401, "You are already verified")
    }
    const otp = generateOtp();

    const redisKey = `otp:${email}`
    await connectRedis();
    await redisClient.set(redisKey, otp, {
        EX: OTP_EXPIRATION
    })

    await sendEmail({
        to: email,
        subject: "Your OTP Code",
        templateName: "otp",
        templateData: {
            name: name,
            otp: otp
        }
    })
};

const verifyOTP = async (email: string, otp: string) => {
    // const user = await User.findOne({ email, isVerified: false })
    const user = await UserModel.findOne({ email })

    if (!user) {
        throw new AppError(404, "User not found")
    }

    if (user.isVerified) {
        throw new AppError(401, "You are already verified")
    }

    const redisKey = `otp:${email}`

    const savedOtp = await redisClient.get(redisKey)

    if (!savedOtp) {
        throw new AppError(401, "Invalid OTP");
    }

    if (savedOtp !== otp) {
        throw new AppError(401, "Invalid OTP");
    }


    await Promise.all([
        UserModel.updateOne({ email }, { isVerified: true }, { runValidators: true }),
        redisClient.del([redisKey])
    ])

};

export const OTPServices = {
    sendOTP,
    verifyOTP
}