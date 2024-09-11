import { Router } from 'express';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

const router = Router();
const usersService = new UsersService();
const usersController = new UsersController(usersService);

// Define routes
router.get('/', usersController.getAllUsers.bind(usersController));
router.get('/:id', usersController.getUserById.bind(usersController));

export default router;
