import { UserModel } from '../UserModel';

export class LoginResponse {
  constructor(public token: string, public user: UserModel) {}
}
