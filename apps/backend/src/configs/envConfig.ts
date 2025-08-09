import dotenv from "dotenv";
import { z } from "zod";

// Load env variables from .env with error handling (optional for production)
try {
	const result = dotenv.config();

	if (result.error && process.env.NODE_ENV !== "production") {
		console.warn(
			"Warning: .env file not found or could not be loaded.\n",
			result.error.message,
		);
		// Don't exit in production as env vars are injected by the platform
		if (process.env.NODE_ENV === "development") {
			process.exit(1);
		}
	}
} catch (error) {
	console.error(
		"Error loading environment configuration:",
		error instanceof Error ? error.message : String(error),
	);
	// Don't exit in production as env vars might be injected by the platform
	if (process.env.NODE_ENV !== "production") {
		process.exit(1);
	}
}

// Define Zod schema for validation and transformation
const envSchema = z.object({
	PORT: z
		.string()
		.default("3000")
		.transform((val) => {
			const parsed = Number(val);
			if (Number.isNaN(parsed)) throw new Error("PORT must be a valid number");
			return parsed;
		}),
	HOST: z.string().default("localhost"),
	NODE_ENV: z.enum(["development", "production"]).default("development"),
	DB_URI: z.string(),
	FRONTEND_URL: z.string(),
	JWT_ACCESS_SECRET: z.string(),
	JWT_ACCESS_EXPIRES: z.string(),
	JWT_REFRESH_SECRET: z.string(),
	JWT_REFRESH_EXPIRES: z.string(),
	REDIS_USERNAME: z.string(),
	REDIS_PASSWORD: z.string(),
	REDIS_HOST: z.string(),
	REDIS_PORT: z
		.string()
		.default("6379")
		.transform((val) => {
			const parsed = Number(val);
			if (Number.isNaN(parsed)) throw new Error("REDIS_PORT must be a valid number");
			return parsed;
		}),
	PASSWORD_HASH_SALT: z
		.string()
		.default("12")
		.transform((val) => {
			const parsed = Number(val);
			if (Number.isNaN(parsed))
				throw new Error("PASSWORD_HASH_SALT must be a valid number");
			return parsed;
		}),
		SMTP_HOST: z.string().default("smtp.gmail.com"),
		SMTP_PORT: z
			.string()
			.default("465")
			.transform((val) => {
				const parsed = Number(val);
				if (Number.isNaN(parsed)) throw new Error("SMTP_PORT must be a valid number");
				return parsed;
			}),
		SMTP_USER: z.string(),
		SMTP_PASS: z.string(),
		SMTP_FROM: z.string().email(),
});

// Validate process.env and infer typed env object
const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
	console.error("❌ Invalid environment configuration:");
	console.error(parsedEnv.error.format());
	process.exit(1);
}
// create type of env
export type Env = z.infer<typeof envSchema>;
// export the parsed env
export const env: Env = parsedEnv.data;
