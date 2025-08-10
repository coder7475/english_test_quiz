import { Request, Response } from "express";
import { OTPServices } from "./otp.services";
import { catchAsync } from "@/utils/asyncHandler";
import sendResponse from "@/utils/sendResponse";
import { env } from "@/configs/envConfig";
import { mongoConnector } from "@repo/db";


const sendOTP = catchAsync(async (req: Request, res: Response) => {
    await mongoConnector(env.DB_URI);
    const { email, name } = req.body;
    await OTPServices.sendOTP(email, name);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "OTP sent successfully",
        data: null,
    });
})

const verifyOTP = catchAsync(async (req: Request, res: Response) => {
    await mongoConnector(env.DB_URI);
    const { email, otp } = req.body;
    await OTPServices.verifyOTP(email, otp);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "OTP verified successfully",
        data: null,
    });
})

export const OTPController = {
    sendOTP,
    verifyOTP
};