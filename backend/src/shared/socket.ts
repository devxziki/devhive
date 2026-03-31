import { Server } from 'socket.io';
import { createServer } from 'http';

let io: Server;

export function initSocket(server: ReturnType<typeof createServer>) {
  io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL,
      credentials: true,
    },
  });
  return io;
}

export { io };
