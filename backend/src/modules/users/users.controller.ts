import { Request, Response } from 'express';
import { UsersService } from './users.service';

export class UsersController {
  private usersService: UsersService;

  // Inject UsersService instance via constructor
  constructor(usersService: UsersService) {
    this.usersService = usersService;
  }

  async getAllUsers(req: Request, res: Response) {
    const users = await this.usersService.getAllUsers();
    res.json(users);
  }

  async getUserById(req: Request, res: Response) {
    const userId = req.params.id;
    const user = await this.usersService.getUserById(userId);
    res.json(user);
  }
}
