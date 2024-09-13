import prisma from '../../config/database.config';
import { UserModel } from './models/user.modal';

export class UserService {
  async findByUsername(username: string): Promise<UserModel | null> {
    return prisma.user.findUnique({ where: { username } });
  }

  async findById(id: string): Promise<UserModel | null> {
    return prisma.user.findUnique({ where: { id } });
  }

  async create(
    username: string,
    email: string,
    passwordHash: string
  ): Promise<UserModel> {
    return prisma.user.create({
      data: {
        username,
        email,
        passwordHash,
      },
    });
  }

  async findByUsernameOrEmail(
    userName: string,
    email: string
  ): Promise<UserModel | null> {
    return prisma.user.findFirst({
      where: {
        OR: [{ username: userName }, { email }],
      },
    });
  }
}

export const userService = new UserService();
