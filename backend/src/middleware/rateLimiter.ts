import { Request, Response, NextFunction } from 'express';
import { redis } from '../shared/redis';

export const rateLimiterLogin = async (req: Request, res: Response, next: NextFunction) => {
  const ip = req.ip;
  const key = `rate:login:${ip}`;
  const current = await redis.incr(key);
  if (current === 1) {
    await redis.expire(key, 60);
  }
  if (current > 10) {
    return res.status(429).json({ message: 'Too many requests' });
  }
  next();
};

export const rateLimiterRegister = async (req: Request, res: Response, next: NextFunction) => {
  const ip = req.ip;
  const key = `rate:register:${ip}`;
  const current = await redis.incr(key);
  if (current === 1) {
    await redis.expire(key, 60);
  }
  if (current > 5) {
    return res.status(429).json({ message: 'Too many requests' });
  }
  next();
};