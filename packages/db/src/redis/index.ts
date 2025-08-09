export * from "./RedisClient.js";
export * from "./types.js";

// Example Usage
// import { RedisClient } from '@your-scope/redis';

// const redis = new RedisClient({
//   socket: { host: 'localhost', port: 6379 },
//   // or url: 'redis://user:pass@localhost:6379'
// });

// async function run() {
//   await redis.set('user:123', { name: 'Robiul' }, 3600);
//   const data = await redis.get('user:123');
//   console.log(data); // { name: 'Robiul' }

//   await redis.disconnect();
// }

// run();
