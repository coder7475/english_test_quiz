import type { NextFunction, Request, Response } from "express";

import { logger } from "./logger";

type AsyncHandler = (
	req: Request,
	res: Response,
	next: NextFunction,
) => Promise<void>;

export const catchAsync =
	(fn: AsyncHandler) => (req: Request, res: Response, next: NextFunction) => {
		Promise.resolve(fn(req, res, next)).catch((err) => {
			logger.error(err);
			next(err);
		});
	};
