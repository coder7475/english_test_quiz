import type { TGenericErrorResponse } from "@/types/error";
import type { CastError, Error as MongooseError } from "mongoose";
import type { ZodError } from "zod";

export const handlerZodError = (err: ZodError): TGenericErrorResponse => {
  const errorSources = err.issues.map((issue) => ({
    path: issue.path.join("."),
    message: issue.message,
  }));

  return {
    statusCode: 400,
    message: "Zod Validation Error",
    errorSources,
  };
};

interface MongoDuplicateError {
  message: string;
  keyValue: Record<string, unknown>;
  code: number;
}

export const handlerDuplicateError = (
  err: MongoDuplicateError,
): TGenericErrorResponse => {
  const regex = /(["'])(\\?.)*?\1/;
  const match = regex.exec(err.message);
  const value = match ? match[0] : "";

  const keyValueKeys = Object.keys(err.keyValue);
  const firstKey = keyValueKeys.length > 0 ? keyValueKeys[0] : "unknown";

  return {
    statusCode: 409,
    message: "Duplicate Key Error",
    errorSources: [
      {
        path: firstKey || "unknown",
        message: `${value} already exists.`,
      },
    ],
  };
};

export const handlerValidationError = (
  err: MongooseError.ValidationError,
): TGenericErrorResponse => {
  const errorSources = Object.values(err.errors).map((val) => ({
    path: val.path,
    message: val.message,
  }));

  return {
    statusCode: 400,
    message: "Validation Error",
    errorSources,
  };
};

export const handleCastError = (err: CastError): TGenericErrorResponse => {
  return {
    statusCode: 400,
    message: "Invalid ObjectId",
    errorSources: [
      {
        path: err.path,
        message: `Invalid value for field: ${err.path}`,
      },
    ],
  };
};
