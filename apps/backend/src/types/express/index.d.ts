import { DecodedUser } from "@/middlewares/CheckAuth";

declare global {
	namespace Express {
		interface Request {
			user?: DecodedUser;
		}
	}
}
