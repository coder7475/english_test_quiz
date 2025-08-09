import indexRouter from "@/routes";
import { mongoConnector } from "@repo/db";
import cors from "cors";
import express, { type Express } from "express";
import helmet from "helmet";

import { env } from "./configs/envConfig";
import { middlewares } from "./middlewares";
import sendResponse from "./utils/sendResponse";

const app: Express = express();

// Connect to Database
mongoConnector(env.DB_URI).catch((err: Error) => console.error(err));

// Middlewares
app.use(cors({
    origin: env.FRONTEND_URL,
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

app.use("/api/v1", indexRouter);

// Root route handler
app.get("/", (_req, res) => {
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Welcome to Test School System!",
    data: null,
  });
});

// Not found route handler (should be after all valid routes)
app.all("*", middlewares.notFoundRoute);
// Global error handler
app.use(middlewares.globalErrorHandler);

export default app;
