import { createClient, RedisClientType } from 'redis';
import { env } from './envConfig';
import { logger } from '@/utils/logger';

export const redisClient: RedisClientType = createClient({
    username: env.REDIS_USERNAME,
    password: env.REDIS_PASSWORD,
    socket: {
        host: env.REDIS_HOST,
        port: Number(env.REDIS_PORT)
    }
});


redisClient.on('error', (err) => logger.error({ err }, 'Redis Client Error'));


export const connectRedis = async () => {
     if (!redisClient.isOpen) {

        try {
            await redisClient.connect();
            logger.info("Redis Connected");
        } catch (err) {
            logger.error({ err }, "Failed to connect to Redis");
            throw err;
        }
     }
}