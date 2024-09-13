import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { UserModel } from '../users/models/user.modal';
export class AuthController {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body;
      const token = await this.authService.login(username, password);
      res.json({ token });
    } catch (error) {
      if (error instanceof Error) {
        // Handle known errors
        res.status(401).json({ message: error.message });
      } else {
        // For unexpected errors
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  }

  async register(req: Request, res: Response) {
    try {
      const { username, email, password } = req.body;
      await this.authService.register(username, email, password);
      res.send('user is registered');
    } catch (error) {
      if (error instanceof Error) {
        // Handle known errors
        res.status(400).json({ message: error.message });
      } else {
        // For unexpected errors
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  }

  async getUser(req: Request, res: Response) {
    const user = req.user as UserModel;

    const { passwordHash: _pass, ...userWithoutPassword } = user;

    res.status(200).json(userWithoutPassword);
  }
}
