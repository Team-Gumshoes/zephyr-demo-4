import cookieParser from 'cookie-parser';
import express, { Express, Request, Response } from 'express';
import { corsMiddleware } from '../middleware/cors.middleware';
import { errorHandler } from '../middleware/error.middleware';
import { loggerMiddleware } from '../middleware/logger.middleware';
import chatRouter from '../routes/chat.routes';
import { requireSupabase } from '../middleware/supabase.middleware';

const createApp = () => {
  const app: Express = express(); // Express 'app' instance
  // Middleware
  app.use(express.json());
  app.use(cookieParser());
  app.use(express.urlencoded({ extended: true }));
  app.use(corsMiddleware);
  app.use(loggerMiddleware);
  app.use(requireSupabase);

  // Root endpoint
  app.get('/', (req: Request, res: Response) => {
    res.json({
      name: 'Allorai API Gateway',
      version: '1.0.0',
      description: 'Gateway for multi-agent travel orchestration',
      endpoints: {
        health: '/api/health',
        flights: '/api/flights',
        hotels: '/api/hotels',
        transport: '/api/transport',
        coordinate: '/api/coordinate',
      },
    });
  });

  // Health check endpoint
  app.get('/health', (req: Request, res: Response) => {
    res.json({
      status: 'healthy',
      service: 'api-gateway2',
      timestamp: new Date().toISOString(),
    });
  });

  app.use(chatRouter);
  // Add additional routers here

  // Error handling middleware (must be last)
  app.use(errorHandler);

  return app;
};
export default createApp;
