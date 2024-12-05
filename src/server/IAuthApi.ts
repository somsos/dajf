import { Observable } from 'rxjs';
import { LoginRequest } from '../domain/user/external/io/LoginRequest';
import { LoginResponse } from '../domain/user/external/io/LoginResponse';

// sync with: daj.adapter.user.inWeb.reqAndResp.LoginResponse
// sync with: daj.adapter.user.inWeb.reqAndResp.LoginRequest

export interface IAuthApi {
  login(req: LoginRequest): Observable<LoginResponse>;
}
