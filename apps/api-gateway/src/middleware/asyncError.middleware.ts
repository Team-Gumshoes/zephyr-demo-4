/*
  This is a 'factory function' that creates a try-catch block wrapper for the handler that is passed in.
  When we refer to our handler in our express routes, we wrap the controller functions
  in this asyncErrorMiddleware.
  By doing this, we remove the need for try-catch blocks in each of our controllers / handlers.
  If we want to do anything special in the catch block, we only need to change it here and 
  that will affect all of our controller functions.
 */

import { NextFunction, Request, Response } from 'express';

const asyncError = (handler: (req: Request, res: Response, next: NextFunction) => void) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await handler(req, res, next); // 'await' is needed here (ignore linting)
    } catch (error) {
      console.log('Caught in asyncError');
      next(error);
    }
  };
};

export default asyncError;
