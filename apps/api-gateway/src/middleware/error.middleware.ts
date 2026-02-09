import { Request, Response, NextFunction } from 'express';
import { type AxiosError } from 'axios';
import { PostgrestError } from '@supabase/supabase-js';

export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode = 500,
    public details?: string,
  ) {
    super(message);
    this.name = statusCode === 500 ? 'DatabaseError' : 'UnknownApiError';
    this.statusCode = statusCode;
  }
}

export const errorHandler = (
  err: PostgrestError | ApiError | AxiosError,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  console.error('[Error]', err);

  if ('isAxiosError' in err && err.isAxiosError) {
    // Handle Axios errors (from service calls)
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
  } else if (err instanceof PostgrestError) {
    // Handle Database errors
    const { code, message, details } = err;
    res.status(Number(code) || 500).json({
      error: 'Database Error',
      message,
      details,
    });
    return;
  } else {
    // Handle other API errors
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
