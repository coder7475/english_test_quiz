import { Router } from "express";
import { ROLE } from "@/types/types";

import { checkAuth } from "./../../middlewares/CheckAuth";
import { userController } from "./user.controller";

const userRoutes: Router = Router();

userRoutes.get("/me", checkAuth(...Object.values(ROLE)), userController.getMe);

export default userRoutes;
