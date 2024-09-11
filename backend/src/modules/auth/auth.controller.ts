import { Request, Response } from 'express';
import { AuthService } from './auth.service';

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  async login(req: Request, res: Response) {
    const { username, password } = req.body;
    const token = await this.authService.login(username, password);
    res.json({ token });
  }

  async register(req: Request, res: Response) {
    const { username, password } = req.body;
    const newUser = await this.authService.register(username, password);
    res.json(newUser);
  }
}
