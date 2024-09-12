import { Router } from 'express';
import { AuthController } from './auth.controller';
import { authService } from './auth.service';
import { LoginDto } from '../dto/login.dto';
import { validateDto } from '../../middlewares/validation.middleware';
import { RegisterDto } from '../dto/register.dto';

const router = Router();
const authController = new AuthController(authService);

// Define routes
router.post('/login', validateDto(LoginDto), authController.login.bind(authController));
router.post('/register', validateDto(RegisterDto), authController.register.bind(authController));

export default router;
