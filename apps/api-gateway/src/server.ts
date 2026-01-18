// 
import express, { Request, Response, type Express } from 'express';
import cors from 'cors';
import { config } from './config/env.js';
import { errorMiddleware } from './middleware/error.middleware.js';

const app: Express = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check route
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Root route
app.get('/', (req: Request, res: Response) => {
  res.send({ message: 'Hello API Gateway' });
});

// Error handling middleware (must be last)
app.use(errorMiddleware);

// Start server
app.listen(config.port, () => {
  console.log(`
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║   🚀 Allorai API Gateway                                  ║
║                                                           ║
║   Port:        ${config.port}                                      ║
║   Environment: ${config.nodeEnv}                             ║
║                                                           ║
║   Services:                                               ║
║   • TypeScript Agents: ${config.typescriptAgentsUrl.padEnd(30)} ║
║   • Python Agents:     ${config.pythonAgentsUrl.padEnd(30)} ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
  `);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully...');
  process.exit(0);
});