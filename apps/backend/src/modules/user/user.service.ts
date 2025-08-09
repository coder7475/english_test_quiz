import AppError from "@/configs/AppError";

import type { IUser } from "./user.interface";
import { UserModel } from "./user.model";

const createUser = async (userData: Partial<IUser>): Promise<IUser> => {
  const { email, password, ...data } = userData;

  if (!email) {
    throw new AppError(400, "Email is required");
  }

  if (!password) {
    throw new AppError(400, "Password is required");
  }

  const isUser = await UserModel.findOne({ email });

  if (isUser) {
    throw new AppError(400, "User Already Exist");
  }


  const user: Partial<IUser> = {
    email,
    password,
    ...data,
  };

  return await UserModel.create(user);
};

const updateUserById = async (userId: string, updateData: Partial<IUser>) => {
  const updatedUser = await UserModel.findByIdAndUpdate(
    userId,
    { $set: updateData },
    { new: true, runValidators: true, select: "-password" },
  );

  return updatedUser;
};

const findUserById = async (userId: string) => {
  return await UserModel.findById(userId).select("-password");
};



export const UserServices = {
  createUser,
  findUserById,
  updateUserById,
  
};
