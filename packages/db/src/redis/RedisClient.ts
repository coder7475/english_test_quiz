import { createClient, RedisClientType } from "redis";

import type { RedisConfig } from "./types.js";

export class RedisClient {
  private client: RedisClientType;
  private isConnected = false;

  constructor(private readonly config: RedisConfig) {
    const connectionOptions: any = {
      username: config.username,
      password: config.password,
    };

    if (config.url) {
      connectionOptions.url = config.url;
    } else if (config.socket) {
      connectionOptions.socket = {
        host: config.socket.host,
        port: config.socket.port,
      };
    } else {
      throw new Error("Redis configuration must include either url or socket");
    }

    this.client = createClient(connectionOptions);
    this.client.on("error", (err) => console.error("Redis Client Error:", err));
  }

  async connect(): Promise<void> {
    if (!this.isConnected) {
      await this.client.connect();
      this.isConnected = true;
    }
  }

  async disconnect(): Promise<void> {
    if (this.isConnected) {
      await this.client.quit();
      this.isConnected = false;
    }
  }

  async get<T = string>(key: string): Promise<T | null> {
    await this.connect();
    const value = await this.client.get(key);
    return value ? (JSON.parse(value) as T) : null;
  }

  async set(key: string, value: any, ttlInSeconds?: number): Promise<void> {
    await this.connect();
    const serialized = JSON.stringify(value);
    if (ttlInSeconds) {
      await this.client.set(key, serialized, { EX: ttlInSeconds });
    } else {
      await this.client.set(key, serialized);
    }
  }

  async del(key: string): Promise<void> {
    await this.connect();
    await this.client.del(key);
  }

  async has(key: string): Promise<boolean> {
    await this.connect();
    const exists = await this.client.exists(key);
    return exists === 1;
  }
}
