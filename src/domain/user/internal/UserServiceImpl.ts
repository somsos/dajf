import { Observable, of, throwError } from 'rxjs';
import { IUserService } from '../external/IUserService';
import { UserModel } from '../external/UserModel';
import { LoginRequest } from '../external/io/LoginRequest';
import { Inject, Injectable } from '@angular/core';
import { IAuthApi } from '../../../server/IAuthApi';
import { LoginResponse } from '../external/io/LoginResponse';

@Injectable({ providedIn: 'root' })
export class UserServiceImpl implements IUserService {
  constructor(@Inject('authApi') private _api: IAuthApi) {}

  login(loginReqInfo: LoginRequest): Observable<LoginResponse> {
    return this._api.login(loginReqInfo);

    /*
    const isAdmin =
      loginReqInfo.username == 'admin' && loginReqInfo.password == 'admin';
    if (isAdmin) {
      userAuth = new UserModel(1, 'admin', [], undefined);
    }

    const isCashier =
      loginReqInfo.username == 'cashier' && loginReqInfo.password == 'cashier';
    if (isCashier) {
      userAuth = new UserModel(1, 'cashier', [], undefined);
    }

    const isStocker =
      loginReqInfo.username == 'stocker' && loginReqInfo.password == 'stocker';
    if (isStocker) {
      userAuth = new UserModel(1, 'Stocker', [], undefined);
    }

    if (userAuth) {
      return of(userAuth);
    }

    return throwError(() => new Error('wrong user or password'));
    */
  }
}
