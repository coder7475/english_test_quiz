import { Router } from "express";
import { validateZod } from "@/middlewares/ValidateRequest";

import { CreateUserSchema } from "../user/user.schema";
import { AuthController } from "./auth.controller";
import { LoginSchema } from "./auth.schema";

const authRoutes: Router = Router();

authRoutes.post(
	"/register",
	validateZod(CreateUserSchema),
	AuthController.registerUser,
);

authRoutes.post("/login", validateZod(LoginSchema), AuthController.login);

authRoutes.post("/refresh-token", AuthController.reissueAccessToken);

authRoutes.post("/logout", AuthController.logout);

export default authRoutes;
