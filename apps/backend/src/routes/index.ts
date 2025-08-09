import authRoutes from "@/modules/auth/auth.routes";
import otpRoutes from "@/modules/otp/otp.route";
import userRoutes from "@/modules/user/user.routes";
import { Router } from "express";

const indexRouter: Router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    routes: authRoutes,
  },
  {
    path: "/user",
    routes: userRoutes,
  },
  {
    path: "/otp",
    routes: otpRoutes
  }
];

moduleRoutes.forEach((route) => {
  indexRouter.use(route.path, route.routes);
});

export default indexRouter;
