import { redis } from "../config/redis.js";

const memoryCache = new Map();

export async function cacheGet(key) {
  if (redis) {
    const value = await redis.get(key);
    return value ? JSON.parse(value) : null;
  }

  const hit = memoryCache.get(key);
  if (!hit || hit.expiresAt < Date.now()) {
    memoryCache.delete(key);
    return null;
  }
  return hit.value;
}

export async function cacheSet(key, value, ttlSeconds = 120) {
  if (redis) {
    await redis.set(key, JSON.stringify(value), "EX", ttlSeconds);
    return;
  }

  memoryCache.set(key, {
    value,
    expiresAt: Date.now() + ttlSeconds * 1000,
  });
}

export async function cacheDelByPrefix(prefix) {
  if (redis) {
    const keys = await redis.keys(`${prefix}*`);
    if (keys.length) {
      await redis.del(...keys);
    }
    return;
  }

  for (const key of memoryCache.keys()) {
    if (key.startsWith(prefix)) {
      memoryCache.delete(key);
    }
  }
}