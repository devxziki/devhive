import { Router } from 'express';
import { rateLimiterLogin, rateLimiterRegister } from '../../middleware/rateLimiter';
import { authenticate } from '../../middleware/authenticate';
import * as authController from './auth.controller';

const router = Router();

router.post('/register', rateLimiterRegister, authController.register);
router.post('/verify-email', authController.verifyEmail);
router.post('/login', rateLimiterLogin, authController.login);
router.post('/refresh', authController.refresh);
router.post('/logout', authController.logout);
router.get('/github', authController.github);
router.get('/github/callback', authController.githubCallback);
router.get('/me', authenticate, authController.me);

export default router;