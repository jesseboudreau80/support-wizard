import express from 'express';
import cors from 'cors';
import ticketsRouter from './routes/tickets';
import authRouter from './routes/auth';
import healthRouter from './routes/health';
import { authMiddleware } from './middleware/auth';

export function createApp() {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(authMiddleware);

  app.use('/api/health', healthRouter);
  app.use('/api/auth', authRouter);
  app.use('/api/tickets', ticketsRouter);

  app.get('/', (_req, res) => {
    res.json({ message: 'Support Wizard backend', docs: '/api/health' });
  });

  return app;
}
