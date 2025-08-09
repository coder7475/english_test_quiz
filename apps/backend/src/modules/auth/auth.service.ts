
import AppError from "@/configs/AppError";
import bcrypt from 'bcrypt';
import { generateToken, verifyToken } from "@/utils/jwtHelpers";

import type { IUser } from "../user/user.interface";
import { UserModel } from "../user/user.model";
import { createUserTokens } from "@/utils/userTokens";

export const login = async (credentials: Partial<IUser>) => {
	const { email, password } = credentials;

	if (!email || !password) {
		throw new AppError(400, "Email or password is Missing!");
	}

	const isUser = await UserModel.findOne({ email });

	if (!isUser) {
		throw new AppError(404, "User does not exits!");
	}

	if (!isUser.isVerified) {
		throw new AppError(401, "User is not verified!");
	}

	// Check password match
	const pass = await bcrypt.compare(password, isUser.password);

	if (!pass) {
		throw new AppError(400, "Incorrect Password!");
	}



	const payload = {
		id: isUser._id,
		email: isUser.email,
		role: isUser.role,
	};

	
	const res = createUserTokens(payload);
	
	return res;
};

const reissueAccessToken = async (refreshToken: string) => {
	const verifiedPayload = verifyToken(refreshToken, "refresh");
	const isUser = await UserModel.findOne({ email: verifiedPayload.email });
	if (!isUser) {
		throw new AppError(404, "User does not Exits!");
	}

	if (!isUser) {
		throw new AppError(400, "User does not exits!");
	}
	

	const payload = {
		id: isUser._id,
		email: isUser.email,
		role: isUser.role,
	};

	const accessToken = generateToken(payload, "access");

	return accessToken;
};

export const AuthServices = {
	login,
	reissueAccessToken,
};
