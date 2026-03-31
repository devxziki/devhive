import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import { env } from '../config/env';

export interface AuthUser {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies?.accessToken || req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });
  try {
    const payload = verifyToken(token, env.JWT_ACCESS_SECRET);
    req.user = { id: payload.id, email: payload.email };
    next();
  } catch {
    res.status(401).json({ message: 'Unauthorized' });
  }
}
