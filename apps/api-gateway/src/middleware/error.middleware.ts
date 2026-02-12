import { Request, Response, NextFunction } from 'express';
import { AxiosError } from 'axios';
import logger from '../utils/logger';

export interface ApiError extends Error {
  code?: string;
  statusCode?: number;
  details?: string;
}

// 502 is bad gateway
//504 gateway timeout
export const errorHandler = (
  err: ApiError | AxiosError,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (err instanceof AxiosError) {
    // Handle Axios errors (from service calls)
    const code = err.code || '';
    const message = err.response?.data || err.message || err.name;

    logger.error(err, `Axios Error (${code}):  ${message}`);
    res.status(err.response?.status || 500).json({
      error: 'Service Error',
      message:
        typeof message === 'string'
          ? message
          : 'An error occurred while communicating with the service',
      details: err.response?.data,
    });
    return;
  }
  
  // Handle Non-axios errors
  const name = err.code && err.code.includes('PGRST') ? 'Database Error' : 'Internal Server Error';
  const { code, message, details, statusCode } = err;

  logger.error(err, `${name} (${code}):  ${message}`);
  res.status(statusCode || 500).json({
    error: name,
    message,
    details,
  });
  return;
};
