export type RedisConfig = {
  url?: string;
  socket?: {
    host: string;
    port: number;
  };
  username?: string;
  password?: string;
};
