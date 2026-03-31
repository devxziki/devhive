import Redis from 'ioredis';
import { env } from '../config/env';

export const redis = new Redis(env.REDIS_URL, {
  lazyConnect: true,
  retryStrategy: () => null,
});

redis.on('error', (err) => {
  console.warn('Redis not available:', err.message);
});