import 'dotenv/config';
import { env } from './config/env';
import { app } from './app';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { prisma } from './shared/prisma';
import { redis } from './shared/redis';
import { initSocket } from './shared/socket';

const httpServer = createServer(app);
const io = initSocket(httpServer);

const PORT = env.PORT;

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const shutdown = async () => {
  console.log('Shutting down...');
  await prisma.$disconnect();
  await redis.quit();
  io.close();
  httpServer.close(() => {
    process.exit(0);
  });
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);