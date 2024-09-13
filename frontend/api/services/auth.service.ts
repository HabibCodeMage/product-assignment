import ApiBase from '../common/ApiBase';
import { LoginPayload } from '../payloads/login.payload';
import { RegisterPayload } from '../payloads/register.payload';

export default class AuthService extends ApiBase {
  async login(data: LoginPayload) {
    return this.axios.post('/auth/login', data);
  }

  async register(data: RegisterPayload) {
    return this.axios.post('/auth/register', data);
  }

  async getUser() {
    return this.axios.get('/auth');
  }
}
