import pino from 'pino';
import { config } from '../config/env';

const logger = pino({
  level: config.LOG_LEVEL || 'info', // sets minimum severity log level. see options in src/config/env.ts
  transport: {
    target: 'pino-pretty',
  },
});

export default logger;
