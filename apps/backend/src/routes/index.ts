import authRoutes from "@/modules/auth/auth.routes";
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
  }
];

moduleRoutes.forEach((route) => {
  indexRouter.use(route.path, route.routes);
});

export default indexRouter;
