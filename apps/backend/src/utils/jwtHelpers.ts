import { parseExpiry } from "@repo/math";
import { JWT } from "@repo/utils";
import type { TokenType } from "@repo/utils/src/jwt/types";
import type { JwtPayload } from "jsonwebtoken";
import { env } from "@/configs/envConfig";

const jwtInstance = new JWT({
	access: {
		secret: env.JWT_ACCESS_SECRET,
		expiresIn: parseExpiry(env.JWT_ACCESS_EXPIRES),
	},
	refresh: {
		secret: env.JWT_REFRESH_SECRET,
		expiresIn: parseExpiry(env.JWT_REFRESH_EXPIRES),
	},
});

export function generateToken(payload: object, type: TokenType = "access") {
	return jwtInstance.signToken(payload, {}, type);
}

export function verifyToken<T = JwtPayload>(
	token: string,
	type: TokenType = "access",
): T {
	return jwtInstance.verifyToken<T>(token, type);
}

export function decodeToken<T = object>(token: string): T | null {
	try {
		return jwtInstance.decodeToken<T>(token);
	} catch {
		return null;
	}
}
