import { Request, Response, NextFunction } from 'express';
import { authService } from '../modules/auth/auth.service';

export async function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization?.split(' ')[1]; // Assumes 'Bearer <token>'

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const user = await authService.validateToken(token);
    if (!user) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    (req as unknown).user = user;

    next();
  } catch (error) {
    if (error instanceof Error) {
      // Error is an instance of the built-in Error class
      res.status(401).json({ message: 'Invalid token', error: error.message });
    } else {
      // Handle unexpected error types
      res
        .status(401)
        .json({
          message: 'Invalid token',
          error: 'An unexpected error occurred',
        });
    }
  }
}
