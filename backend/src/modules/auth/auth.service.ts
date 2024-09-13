import bcrypt from 'bcryptjs';
import { userService, UserService } from '../users/users.service';
import { UserModel } from '../users/models/user.modal';
import { generateToken, verifyToken } from '../../utils/jwt';

export class AuthService {
  constructor(private userService: UserService) {}
  async login(username: string, password: string): Promise<string> {
    const user = await this.userService.findByUsername(username);

    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      throw new Error('Invalid username or password');
    }

    return generateToken(user.id);
  }

  async register(
    username: string,
    email: string,
    password: string
  ): Promise<UserModel> {
    // Check if user already exists
    const existingUser = await this.userService.findByUsernameOrEmail(
      username,
      email
    );
    if (existingUser) {
      throw new Error('User already exists');
    }

    // Hash the password and create the user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await this.userService.create(
      username,
      email,
      hashedPassword
    );

    return new UserModel(newUser);
  }

  async validateToken(token: string): Promise<UserModel | null> {
    // Verify and decode the token
    const decoded = verifyToken(token);

    // Type assertion to ensure decoded object has the expected structure
    const userId = (decoded as { sub?: string }).sub;
    if (!userId) return null;

    const user = await this.userService.findById(userId);
    return user ? new UserModel(user) : null;
  }
}

export const authService = new AuthService(userService);
