import cors from 'cors';
// import { config } from '../config/env.js';

export const corsMiddleware = cors({
  origin: "https://t-latest-platform-zephyr-demo-4-team-gumshoes-ze.zephyrcloud.app/", //config.CORS_ORIGIN,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
});
