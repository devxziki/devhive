import { env } from './config/env';
import { app } from './app';
import { prisma } from './shared/prisma';
import { redis } from './shared/redis';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { io } from './shared/socket';

const PORT = env.PORT;
const server = createServer(app);
io.attach(server);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const shutdown = async () => {
  console.log('Shutting down...');
  await prisma.$disconnect();
  await redis.quit();
  server.close(() => {
    process.exit(0);
  });
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
