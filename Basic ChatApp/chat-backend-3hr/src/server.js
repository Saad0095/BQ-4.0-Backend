
import http from 'http';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { Server as SocketIOServer } from 'socket.io';
import { connectDB, PORT, CLIENT_ORIGIN, JWT_SECRET } from './config.js';
import authRoutes from './routes/auth.routes.js';
import messageRoutes from './routes/message.routes.js';
import registerChatHandlers from './sockets/chat.js';

async function main() {
  await connectDB();

  const app = express();
  const server = http.createServer(app);
  const io = new SocketIOServer(server, {
    path: '/socket.io',
    cors: { origin: CLIENT_ORIGIN, credentials: true }
  });

  // Middleware
  app.use(cors({ origin: CLIENT_ORIGIN, credentials: true }));
  app.use(express.json());
  app.use(cookieParser());

  // Routes
  app.get('/health', (req, res) => res.json({ ok: true }));
  app.use('/api/auth', authRoutes);
  app.use('/api/messages', messageRoutes);

  registerChatHandlers(io)

  server.listen(PORT, () => {
    console.log(`[http] listening on http://localhost:${PORT}`);
  });
}

main().catch((e) => {
  console.error('Fatal:', e);
  process.exit(1);
});
