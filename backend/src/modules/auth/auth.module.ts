import { Router } from 'express';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

const router = Router();
const authService = new AuthService();
const authController = new AuthController(authService);

// Define routes
router.post('/login', authController.login.bind(authController));
router.post('/register', authController.register.bind(authController));

export default router;
