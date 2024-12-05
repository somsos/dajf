import { Observable } from 'rxjs';
import { LoginRequest } from './io/LoginRequest';
import { LoginResponse } from './io/LoginResponse';

export interface IUserService {
  login(loginReqInfo: LoginRequest): Observable<LoginResponse>;
}
