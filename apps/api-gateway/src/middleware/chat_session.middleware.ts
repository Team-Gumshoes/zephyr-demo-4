import { Request, Response, NextFunction } from 'express';

export const extractSessionFromCookie = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const sessionId = req.cookies?.chat_session_id;

  if (!sessionId) {
    res.status(401).json({
      error: 'No session found. Please create a session first.',
    });
    return;
  }

  // Attach session ID to request object for use in route handlers
  req.body.sessionId = sessionId;
  next();
};