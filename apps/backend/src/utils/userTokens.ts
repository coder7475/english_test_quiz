import type { IUser } from "@/modules/user/user.interface";

import { generateToken, verifyToken } from "./jwtHelpers";

export function createUserTokens(payload: Partial<IUser>) {
	const accessToken = generateToken(payload, "access");
	const refreshToken = generateToken(payload, "refresh");
	return {
		accessToken,
		refreshToken,
	};
}

export function createNewAccessTokenWithRefreshToken(refreshToken: string) {
	// We'll verify the refresh token and generate a new access token
	try {
		// The payload should be the user info stored in the refresh token
		const { password: _password, ...userPayload } = verifyToken<Partial<IUser>>(
			refreshToken,
			"refresh",
		);

		const accessToken = generateToken(userPayload, "access");
		return { accessToken };
	} catch (error) {
		// Log the error for debugging purposes
		console.error("Failed to create new access token with refresh token:", error);
		// Return null to indicate failure
		return null;
	}
}
