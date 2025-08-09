import type { NextFunction, Request, Response } from "express";
import { catchAsync } from "@/utils/asyncHandler";
import sendResponse from "@/utils/sendResponse";

import { UserServices } from "./user.service";

const createUser = catchAsync(async (req: Request, res: Response) => {
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
