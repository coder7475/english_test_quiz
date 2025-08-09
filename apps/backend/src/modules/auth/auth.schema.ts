import { z } from "zod";

export const LoginSchema = z.object({
	email: z
		.string({ invalid_type_error: "Email must be string" })
		.email({ message: "Invalid email address format." })
		.min(5, { message: "Email must be at least 5 characters long." })
		.max(100, { message: "Email cannot exceed 100 characters." }),

	password: z
		.string({ invalid_type_error: "Password must be string" })
		.min(8, { message: "Password must be at least 8 characters long." }),
});
