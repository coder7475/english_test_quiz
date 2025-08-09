import pino from "pino";
import { env } from "@/configs/envConfig";

export const logger = pino({
	transport:
		env.NODE_ENV === "development"
			? {
					target: "pino-pretty", // for human-readable dev output
					options: {
						colorize: true,
						translateTime: "SYS:standard",
						ignore: "pid,hostname",
					},
				}
			: undefined, // raw JSON logs for production
	level: "info", // or "debug" in dev
});
