import AppError from "@/configs/AppError";
import { catchAsync } from "@/utils/asyncHandler";
import { setAuthCookies } from "@/utils/cookieHelpers";
import sendResponse from "@/utils/sendResponse";
import type { NextFunction, Request, Response } from "express";

import { UserServices } from "../user/user.service";
import { AuthServices } from "./auth.service";
import { mongoConnector } from "@repo/db";
import { env } from "@/configs/envConfig";

const registerUser = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    await mongoConnector(env.DB_URI);
    const user = await UserServices.createUser(req.body);

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "User registered successfully. Please Verify your email.",
      data: user,
    });
  },
);

const login = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    await mongoConnector(env.DB_URI);
    const generatedTokens = await AuthServices.login(req.body);

    setAuthCookies(res, generatedTokens);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "User login successful",
      data: {
        accessToken: generatedTokens.accessToken,
        refreshToken: generatedTokens.refreshToken,
      },
    });
  },
);

// Refresh token function
const reissueAccessToken = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    await mongoConnector(env.DB_URI);
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      throw new AppError(401, "Refresh token required");
    }

    const refreshToken = authHeader.split(" ")[1];
    if (!refreshToken) {
      throw new AppError(401, "Refresh token not found");
    }

    const newAccessToken = await AuthServices.reissueAccessToken(refreshToken);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Access token refreshed successfully",
      data: {
        accessToken: newAccessToken,
        refreshToken,
      },
    });
  },
);

// Logout endpoint
const logout = catchAsync(
  async (_req: Request, res: Response, _next: NextFunction) => {
    // Clear the refresh token cookie (if set)
    
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Logged out successfully",
      data: null,
    });
  },
);

export const AuthController = {
  registerUser,
  login,
  reissueAccessToken,
  logout,
};
