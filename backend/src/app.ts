import express, { Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { errorHandler } from './middleware/errorHandler';
import authRouter from './modules/auth/auth.router';

const app = express();

app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', (req: Request, res: Response) => res.send('users route'));
app.use('/api/v1/posts', (req: Request, res: Response) => res.send('posts route'));
app.use('/api/v1/feed', (req: Request, res: Response) => res.send('feed route'));
app.use('/api/v1/rooms', (req: Request, res: Response) => res.send('rooms route'));
app.use('/api/v1/reactions', (req: Request, res: Response) => res.send('reactions route'));
app.use('/api/v1/comments', (req: Request, res: Response) => res.send('comments route'));
app.use('/api/v1/notifications', (req: Request, res: Response) => res.send('notifications route'));

app.use((err: Error, req: Request, res: Response, next: NextFunction) => errorHandler(err, req, res, next));

export { app };