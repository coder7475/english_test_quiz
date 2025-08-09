import express, { type Router } from "express";
import { OTPController } from "./otp.controller";

const otpRoutes: Router = express.Router();

otpRoutes.post("/send", OTPController.sendOTP);
otpRoutes.post("/verify", OTPController.verifyOTP);

export default otpRoutes;