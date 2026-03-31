import { Request, Response, NextFunction } from 'express';
import { authService } from './auth.service';
import { registerSchema, loginSchema, verifyEmailSchema } from './auth.schema';
import { validate } from '../../middleware/validate';
import type { AuthUser } from '../../middleware/authenticate';

export const register = [
  validate(registerSchema),
  async (req: Request, res: Response, _next: NextFunction) => {
    const result = await authService.register(req.body);
    res.status(201).json(result);
  },
];

export const verifyEmail = [
  validate(verifyEmailSchema),
  async (req: Request, res: Response, _next: NextFunction) => {
    const result = await authService.verifyEmail(req.body.token);
    res.status(200).json(result);
  },
];

export const login = [
  validate(loginSchema),
  async (req: Request, res: Response, _next: NextFunction) => {
    const result = await authService.login(req.body);
    
    res.cookie('accessToken', result.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 15 * 60 * 1000,
    });

    res.cookie('refreshToken', result.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ user: result.user });
  },
];

export const refresh = async (req: Request, res: Response) => {
  const refreshToken = req.cookies?.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({ message: 'No refresh token' });
  }

  const result = await authService.refresh(refreshToken);

  res.cookie('accessToken', result.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 15 * 60 * 1000,
  });

  res.cookie('refreshToken', result.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({ message: 'Token refreshed' });
};

export const logout = async (req: Request, res: Response) => {
  const refreshToken = req.cookies?.refreshToken;
  
  if (refreshToken) {
    await authService.logout(refreshToken);
  }

  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
  res.status(200).json({ message: 'Logged out' });
};

export const github = (_req: Request, res: Response) => {
  const githubAuthUrl = new URL('https://github.com/login/oauth/authorize');
  githubAuthUrl.searchParams.set('client_id', process.env.GITHUB_CLIENT_ID!);
  githubAuthUrl.searchParams.set('redirect_uri', `${process.env.CLIENT_URL}/api/v1/auth/github/callback`);
  githubAuthUrl.searchParams.set('scope', 'user:email');
  res.redirect(githubAuthUrl.toString());
};

export const githubCallback = async (req: Request, res: Response) => {
  const code = req.query.code;
  if (!code) {
    return res.status(400).json({ message: 'No code provided' });
  }

  const result = await authService.githubLogin(code as string);

  res.cookie('accessToken', result.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 15 * 60 * 1000,
  });

  res.cookie('refreshToken', result.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.redirect(`${process.env.CLIENT_URL}/feed`);
};

export const me = async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const user = await authService.getMe(req.user.id);
  res.status(200).json(user);
};