import { Request, Response, NextFunction } from 'express';
import { type AxiosError } from 'axios';

export interface ApiError extends Error {
  statusCode?: number;
  details?: any;
}

export const errorMiddleware = (
  err: ApiError | AxiosError,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  console.error('[Error]', err);

  // Handle Axios errors (from service calls)
  if ('isAxiosError' in err && err.isAxiosError) {
    const axiosError = err as AxiosError;
    const status = axiosError.response?.status || 500;
    const message = axiosError.response?.data || axiosError.message;

    res.status(status).json({
      error: 'Service Error',
      message:
        typeof message === 'string'
          ? message
          : 'An error occurred while communicating with the service',
      details: axiosError.response?.data,
    });
    return;
  } else {
    // Handle custom API errors
    const customError = err as any;
    const statusCode = customError.statusCode || 500;
    const message = customError.message || 'Internal Server Error';

    res.status(statusCode).json({
      error: customError.name || 'Error',
      message,
      details: customError.details,
    });
    return;
  }
};
