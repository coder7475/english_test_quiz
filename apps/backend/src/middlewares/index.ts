import GlobalErrorHandler from "./GlobalErrorHandler";
import NotFoundRoute from "./NotFoundRoute";
import * as ValidateRequest from "./ValidateRequest";

export const middlewares: {
	globalErrorHandler: typeof GlobalErrorHandler;
	notFoundRoute: typeof NotFoundRoute;
	validateRequest: typeof ValidateRequest;
} = {
	globalErrorHandler: GlobalErrorHandler,
	notFoundRoute: NotFoundRoute,
	validateRequest: ValidateRequest,
};
