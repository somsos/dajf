import { Observable } from 'rxjs';
import { LoginRequest } from './io/LoginRequest';
import { LoginResponse } from './io/LoginResponse';

export const userServiceName = 'UserService';

export interface IUserService {
  login(loginReqInfo: LoginRequest): Observable<LoginResponse>;
}
