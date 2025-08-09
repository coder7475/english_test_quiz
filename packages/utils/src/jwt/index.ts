import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";

import { JWTConfig, Payload, TokenType } from "./types.js";

export class JWT {
  private readonly accessConfig: JWTConfig;
  private readonly refreshConfig: JWTConfig;

  constructor({ access, refresh }: { access: JWTConfig; refresh: JWTConfig }) {
    this.accessConfig = access;
    this.refreshConfig = refresh;
  }

  signToken(
    payload: Payload,
    options: SignOptions = {},
    type: TokenType = "access",
  ): string {
    const config = type === "access" ? this.accessConfig : this.refreshConfig;
    return jwt.sign(payload, config.secret, {
      ...options,
      ...(config.expiresIn !== undefined
        ? { expiresIn: config.expiresIn }
        : {}),
    });
  }

  verifyToken<T = JwtPayload>(token: string, type: TokenType = "access"): T {
    const config = type === "access" ? this.accessConfig : this.refreshConfig;
    return jwt.verify(token, config.secret) as T;
  }

  decodeToken<T = JwtPayload>(token: string): T | null {
    return jwt.decode(token) as T | null;
  }
}
