import type { NextFunction, Request, Response } from "express";
import AppError from "@/configs/AppError";
import { UserModel } from "@/modules/user/user.model";

import { verifyToken } from "@/utils/jwtHelpers";

interface DecodedUser {
	id: string;
	email?: string;
	role: string;
}

export const checkAuth =
	(...allowedRoles: string[]) =>
	async (req: Request, _res: Response, next: NextFunction) => {
		try {			
			const authHeader = req.headers.authorization;
			let token: string | undefined;
			if (authHeader?.startsWith("Bearer ")) {
				token = authHeader.split(" ")[1];
			} else if (req.cookies?.accessToken) {
				token = req.cookies.accessToken;
			}


			if (!token) {
				throw new AppError(403, "Unauthorized: No token provided");
			}
			
			const decoded = verifyToken(token);
			const isUser = await UserModel.findOne({ email: decoded.email });

			if (!isUser) {
				throw new AppError(400, "User does not exits!");
			}		

			if (
				!decoded?.role ||
				(allowedRoles.length && !allowedRoles.includes(decoded.role))
			) {
				throw new AppError(
					403,
					"Forbidden: You do not have access to this resource",
				);
			}

			req.user = decoded;

			next();
		} catch (error) {
			console.error("Auth Error:", error);
			next(error);
		}
	};
