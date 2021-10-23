import { verify } from 'jsonwebtoken';
import type { Request, Response, NextFunction } from 'express';

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    return response.status(401).json({ errorCode: 'token.invalid' });
  }

  const [, token] = authToken.split(' ');

  try {
    const { sub } = verify(token, process.env.JWT_SECRET as string);

    response.locals.user_id = sub;

    return next();
  } catch (error: any) {
    return response.status(401).json({ errorCode: 'token.expired' });
  }
}
