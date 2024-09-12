import { User } from '@prisma/client';

export class UserModel {
  id: string;
  username: string;
  email: string;
  passwordHash: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(user: User) {
    this.id = user.id;
    this.username = user.username;
    this.email = user.email;
    this.passwordHash = user.passwordHash;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }
}
