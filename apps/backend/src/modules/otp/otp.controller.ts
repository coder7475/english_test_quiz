import { Request, Response } from "express";
import { OTPServices } from "./otp.services";
import { catchAsync } from "@/utils/asyncHandler";
import sendResponse from "@/utils/sendResponse";


const sendOTP = catchAsync(async (req: Request, res: Response) => {
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