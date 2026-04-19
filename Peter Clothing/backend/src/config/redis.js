import Redis from "ioredis";
import { env } from "./env.js";

let redis = null;

if (env.redisUrl) {
  redis = new Redis(env.redisUrl, {
    maxRetriesPerRequest: 2,
    lazyConnect: true,
  });

  redis.on("error", () => {
    // Cache is optional; API should continue to work if Redis is unavailable.
  });
}

export { redis };