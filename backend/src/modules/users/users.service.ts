export class UsersService {
  async getAllUsers() {
    // Business logic to fetch all users from the database
    return [{ id: 1, name: 'John Doe' }];
  }

  async getUserById(id: string) {
    // Business logic to fetch a user by ID
    return { id, name: 'John Doe' };
  }
}
