import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { Queue } from 'bullmq';
import { prisma } from '../../shared/prisma';
import { redis } from '../../shared/redis';
import { signAccessToken, signRefreshToken, verifyToken } from '../../utils/jwt';
import { env } from '../../config/env';
import { ApiError } from '../../middleware/errorHandler';
import type { RegisterInput, LoginInput } from './auth.schema';

const emailQueue = new Queue('email-queue', { connection: redis });

export class AuthService {
  async register(input: RegisterInput) {
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email: input.email }, { username: input.username }],
      },
    });

    if (existingUser) {
      if (existingUser.email === input.email) {
        throw new ApiError(409, 'Email already in use');
      }
      throw new ApiError(409, 'Username already in use');
    }

    const hashedPassword = await bcrypt.hash(input.password, 12);

    const user = await prisma.user.create({
      data: {
        email: input.email,
        password: hashedPassword,
        username: input.username,
      },
    });

    const token = crypto.randomBytes(32).toString('hex');
    await redis.setex(`verify:${token}`, 900, user.id);

    await emailQueue.add('send-verification-email', {
      email: user.email,
      username: user.username,
      token,
    });

    return { message: 'Verification email sent' };
  }

  async verifyEmail(token: string) {
    const userId = await redis.get(`verify:${token}`);
    if (!userId) {
      throw new ApiError(400, 'Invalid or expired token');
    }

    await prisma.user.update({
      where: { id: userId },
      data: { emailVerified: true },
    });

    await redis.del(`verify:${token}`);

    return { message: 'Email verified' };
  }

  async login(input: LoginInput) {
    const user = await prisma.user.findUnique({
      where: { email: input.email },
    });

    if (!user) {
      throw new ApiError(401, 'Invalid credentials');
    }

    if (!user.password) {
      throw new ApiError(401, 'Invalid credentials');
    }

    const isValid = await bcrypt.compare(input.password, user.password);
    if (!isValid) {
      throw new ApiError(401, 'Invalid credentials');
    }

    if (!user.emailVerified) {
      throw new ApiError(403, 'Please verify your email first');
    }

    const accessToken = signAccessToken({ id: user.id, email: user.email });
    const refreshToken = crypto.randomBytes(32).toString('hex');

    await prisma.authToken.create({
      data: {
        userId: user.id,
        token: refreshToken,
      },
    });

    await redis.setex(`refresh:${refreshToken}`, 7 * 24 * 60 * 60, user.id);

    return {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        avatarUrl: user.avatarUrl,
      },
      accessToken,
      refreshToken,
    };
  }

  async refresh(refreshToken: string) {
    const userId = await redis.get(`refresh:${refreshToken}`);
    if (!userId) {
      throw new ApiError(401, 'Invalid refresh token');
    }

    const tokenRecord = await prisma.authToken.findFirst({
      where: { token: refreshToken, userId },
    });

    if (!tokenRecord) {
      throw new ApiError(401, 'Invalid refresh token');
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new ApiError(401, 'User not found');
    }

    await prisma.authToken.delete({ where: { id: tokenRecord.id } });
    await redis.del(`refresh:${refreshToken}`);

    const newAccessToken = signAccessToken({ id: user.id, email: user.email });
    const newRefreshToken = crypto.randomBytes(32).toString('hex');

    await prisma.authToken.create({
      data: {
        userId: user.id,
        token: newRefreshToken,
      },
    });

    await redis.setex(`refresh:${newRefreshToken}`, 7 * 24 * 60 * 60, user.id);

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  }

  async logout(refreshToken: string) {
    await prisma.authToken.deleteMany({
      where: { token: refreshToken },
    });

    await redis.del(`refresh:${refreshToken}`);

    return { message: 'Logged out successfully' };
  }

  async getMe(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        username: true,
        name: true,
        avatarUrl: true,
        emailVerified: true,
        createdAt: true,
      },
    });

    if (!user) {
      throw new ApiError(401, 'User not found');
    }

    return user;
  }

  async githubLogin(code: string) {
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        client_id: env.GITHUB_CLIENT_ID,
        client_secret: env.GITHUB_CLIENT_SECRET,
        code,
      }),
    });

    const tokenData = await tokenResponse.json() as { access_token?: string };
    if (!tokenData.access_token) {
      throw new ApiError(400, 'Failed to get GitHub access token');
    }

    const [userRes, emailRes] = await Promise.all([
      fetch('https://api.github.com/user', {
        headers: { Authorization: `Bearer ${tokenData.access_token}` },
      }),
      fetch('https://api.github.com/user/emails', {
        headers: { Authorization: `Bearer ${tokenData.access_token}` },
      }),
    ]);

    const githubUser = await userRes.json() as { id: number; login: string; avatar_url?: string; email?: string };
    const emails = await emailRes.json() as Array<{ email: string; primary: boolean }>;
    const primaryEmail = emails.find(e => e.primary)?.email || emails[0]?.email;

    if (!primaryEmail) {
      throw new ApiError(400, 'GitHub email not available');
    }

    const user = await prisma.user.upsert({
      where: { email: primaryEmail },
      create: {
        email: primaryEmail,
        username: githubUser.login,
        avatarUrl: githubUser.avatar_url,
        emailVerified: true,
      },
      update: {
        username: githubUser.login,
        avatarUrl: githubUser.avatar_url,
        emailVerified: true,
      },
    });

    const accessToken = signAccessToken({ id: user.id, email: user.email });
    const refreshToken = crypto.randomBytes(32).toString('hex');

    await prisma.authToken.create({
      data: {
        userId: user.id,
        token: refreshToken,
      },
    });

    await redis.setex(`refresh:${refreshToken}`, 7 * 24 * 60 * 60, user.id);

    return {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        avatarUrl: user.avatarUrl,
      },
      accessToken,
      refreshToken,
    };
  }
}

export const authService = new AuthService();