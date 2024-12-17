import { Observable } from 'rxjs';
import { IUserService } from '../external/IUserService';
import { LoginRequest } from '../external/io/LoginRequest';
import { Inject, Injectable } from '@angular/core';
import { IAuthApi } from '../../../server/IAuthApi';
import { LoginResponse } from '../external/io/LoginResponse';

@Injectable({ providedIn: 'root' })
export class UserServiceImpl implements IUserService {
  constructor(@Inject('authApi') private _api: IAuthApi) {}

  login(loginReqInfo: LoginRequest): Observable<LoginResponse> {
    return this._api.login(loginReqInfo);
  }
}
