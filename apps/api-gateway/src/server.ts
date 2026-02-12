import { type Express } from 'express';
import { config } from './config/env.js';
import { connectToSupabase } from './startup/connectToDB.js';
import createApp from './startup/createApp.js';
import logger from './utils/logger.js';

// Create express app and add all middleware and routes
const app: Express = createApp();

// Connect to Supabase
connectToSupabase();

// Start server
app.listen(config.PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║   🚀 Allorai API Gateway                                  ║
║                                                           ║
║   Served on Port:      ${String(config.PORT).padEnd(35," ")}║
║   Environment:         ${String(config.NODE_ENV).padEnd(35," ")}║
║   AI Requests Config:                                     ║
║     ${String(config.AGENTS_URL).padEnd(54," ")}║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
  `);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.warn('SIGTERM received, shutting down gracefully...');
  process.exit(0);
});

process.on('SIGINT', () => {
  logger.warn('SIGINT received, shutting down gracefully...');
  process.exit(0);
});
