import { Request, Response, NextFunction } from 'express';
import { redis } from '../shared/redis';

const WINDOW_SIZE = 60; // seconds
const MAX_REQUESTS = 100;

export async function rateLimiter(req: Request, res: Response, next: NextFunction) {
  const ip = req.ip;
  const key = `rate:${ip}`;
  const current = await redis.incr(key);
  if (current === 1) {
    await redis.expire(key, WINDOW_SIZE);
  }
  if (current > MAX_REQUESTS) {
    return res.status(429).json({ message: 'Too many requests' });
  }
  next();
}
