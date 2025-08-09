import type { JwtPayload, SignOptions } from "jsonwebtoken";

export type TokenType = "access" | "refresh";

export interface JWTConfig {
  secret: string;
  expiresIn?: SignOptions["expiresIn"];
}

export type Payload = JwtPayload | string;
export type CJwtPayload = JwtPayload;
