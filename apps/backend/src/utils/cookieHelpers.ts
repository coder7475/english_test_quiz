import { env } from "@/configs/envConfig";
import { parseExpiry } from "@repo/math";
import type { Response } from "express";

interface AuthTokens {
  accessToken?: string;
  refreshToken?: string;
}

export const setAuthCookies = (
  res: Response,
  { accessToken, refreshToken }: AuthTokens,
) => {
  const isDev = env.NODE_ENV === "development";

  if (accessToken) {
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: !isDev,
      sameSite: isDev ? "lax" : "none",
      maxAge: parseExpiry(env.JWT_ACCESS_EXPIRES),
    });
  }

  if (refreshToken) {
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: !isDev,
      sameSite: isDev ? "lax" : "none",
      maxAge: parseExpiry(env.JWT_REFRESH_EXPIRES),
    });
  }
};

export const clearAuthCookie = (res: Response) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
};
