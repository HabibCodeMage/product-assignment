import { Request, Response } from 'express';
import { UserService } from './users.service';

export class UsersController {
  private usersService: UserService;

  // Inject UsersService instance via constructor
  constructor(usersService: UserService) {
    this.usersService = usersService;
  }
}
