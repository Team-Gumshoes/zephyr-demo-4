import { type Express } from 'express';
import { config } from './config/env.js';
import { connectToSupabase } from './startup/connectToDB.js';
import createApp from './startup/createApp.js';

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
║   Port:        ${String(config.PORT).padEnd(43," ")}║
║   Environment: ${String(config.NODE_ENV).padEnd(43," ")}║
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
