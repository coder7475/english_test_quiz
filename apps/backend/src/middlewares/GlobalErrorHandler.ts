import AppError from "@/configs/AppError";
import { env } from "@/configs/envConfig";
import type { TErrorSources } from "@/types/error";
import {
  handleCastError,
  handlerDuplicateError,
  handlerValidationError,
  handlerZodError,
} from "@/utils/errorHelpers";
import { logger } from "@/utils/logger";
import type { NextFunction, Request, Response } from "express";
import type { CastError, Error as MongooseError } from "mongoose";
import type { ZodError } from "zod";

const MONGO_DUPLICATE_KEY_ERROR = 11_000;

// Type definitions for error handlers
interface MongoDuplicateError {
  message: string;
  keyValue: Record<string, unknown>;
  code: number;
}

const GlobalErrorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  // Log the error
  if (env.NODE_ENV === "development") {
    logger.error(err as Error, "🔴 Error:");
  } else {
    logger.error({ err }, "🔴 Unexpected error");
  }

  let errorSources: TErrorSources[] = [];
  let statusCode = 500;
  let message = "Something went wrong!";

  // Type guards
  const isObject = (val: unknown): val is Record<string, unknown> =>
    typeof val === "object" && val !== null;

  // Duplicate key error (MongoDB)
  if (
    isObject(err) &&
    "code" in err &&
    err.code === MONGO_DUPLICATE_KEY_ERROR
  ) {
    const simplifiedError = handlerDuplicateError(
      err as unknown as MongoDuplicateError,
    );
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
  }
  // Cast error (invalid ObjectId)
  else if (isObject(err) && "name" in err && err.name === "CastError") {
    const simplifiedError = handleCastError(err as unknown as CastError);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
  }
  // Zod schema validation error
  else if (isObject(err) && "name" in err && err.name === "ZodError") {
    const simplifiedError = handlerZodError(err as unknown as ZodError);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;
  }
  // Mongoose validation error
  else if (isObject(err) && "name" in err && err.name === "ValidationError") {
    const simplifiedError = handlerValidationError(
      err as unknown as MongooseError.ValidationError,
    );
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;
  }
  // Custom AppError
  else if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  }
  // General JS error
  else if (err instanceof Error) {
    message = err.message;
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    ...(env.NODE_ENV === "development" && {
      err,
      stack: err instanceof Error ? err.stack : undefined,
    }),
  });
};

export default GlobalErrorHandler;
