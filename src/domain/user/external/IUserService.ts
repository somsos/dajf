import { Observable } from 'rxjs';
import { LoginRequest } from './io/LoginRequest';
import { UserModel } from './UserModel';

export interface IUserService {
  login(loginReqInfo: LoginRequest): Observable<UserModel>;
}
