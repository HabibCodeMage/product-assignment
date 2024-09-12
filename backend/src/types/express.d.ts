import { UserModel } from '../models/user.model';

declare global {
  namespace Express {
    interface Request {
      user?: UserModel; // Adding the `user` property to the Request interface
    }
  }
}
