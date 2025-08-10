import type { NextFunction, Request, Response } from "express";
import { catchAsync } from "@/utils/asyncHandler";
import sendResponse from "@/utils/sendResponse";

import { UserServices } from "./user.service";
import { env } from "@/configs/envConfig";
import { mongoConnector } from "@repo/db";

const createUser = catchAsync(async (req: Request, res: Response) => {
	 mongoConnector(env.DB_URI);
	const userData = req.body;
	const user = await UserServices.createUser(userData);

	sendResponse(res, {
		success: true,
		statusCode: 201,
		message: "User created successfully",
		data: user,
	});
});

const updateUser = catchAsync(
	async (req: Request, res: Response, _next: NextFunction) => {
		await mongoConnector(env.DB_URI);
		const userId = req.user.id;
		const updateData = req.body;
		const result = await UserServices.updateUserById(userId, updateData);

		sendResponse(res, {
			success: true,
			statusCode: 200,
			message: "User data updated successfully",
			data: result,
		});
	},
);

const getMe = catchAsync(
	async (req: Request, res: Response, _next: NextFunction) => {
		const userId = req.user.id;
		const user = await UserServices.findUserById(userId);

		sendResponse(res, {
			success: true,
			statusCode: 200,
			message: "Your profile retrieved successfully",
			data: user,
		});
	},
);


export const userController = {
	createUser,
	updateUser,
	getMe,
};
