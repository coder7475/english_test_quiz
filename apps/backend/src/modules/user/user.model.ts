import { type Document, type Model, model, Schema } from "mongoose";
import bcrypt from 'bcrypt';
import type { IUser } from "./user.interface";
import { CERTIFICATION_LEVEL, ROLE, STATUS } from "@/types/types";
import { env } from "@/configs/envConfig";

export interface IUserDoc extends IUser, Document {}


const UserMongooseSchema = new Schema<IUserDoc>(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },		
		password: { type: String, required: true },
		role: { 
			type: String, 
			enum: Object.values(ROLE), 
			default: ROLE.USER 
		},	
		isVerified: { type: Boolean, default: false}	,
		status: {
			type: String, 
			enum: Object.values(STATUS),
			default: STATUS.ACTIVE
		},
		certificationLevel: {
			type: String,
			enum: Object.values(CERTIFICATION_LEVEL),
			default: CERTIFICATION_LEVEL.A1
		}
	},
	{ timestamps: true, versionKey: false },
);

UserMongooseSchema.pre('save', async function (next) {
  const user = this; // doc
  // hashing password and save into DB
  user.password = await bcrypt.hash(
    user.password,
    Number(env.PASSWORD_HASH_SALT),
  );
  next();
});

// set '' after saving password
UserMongooseSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});


export const UserModel: Model<IUserDoc> = model("User", UserMongooseSchema);
