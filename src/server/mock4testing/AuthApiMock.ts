import { delay, Observable, of, take, throwError } from 'rxjs';
import { LoginRequest } from '../../domain/user/external/io/LoginRequest';
import { LoginResponse } from '../../domain/user/external/io/LoginResponse';
import { IAuthApi } from '../IAuthApi';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { environment } from '../../environment/environment';
import { UserModel } from '../../domain/user/external/UserModel';

export class AuthApiMock implements IAuthApi {
  private readonly _http = inject(HttpClient);

  private static readonly epLogin = environment.host + '/auth/create-token';

  login(req: LoginRequest): Observable<LoginResponse> {
    let userAuth: LoginResponse | undefined;

    const isAdmin = req.username == 'mario1' && req.password == 'mario1p';
    if (isAdmin) {
      const token = 'token1';
      const role = { id: 2, authority: 'ROLE_admin_users' };
      const user: UserModel = {
        id: 1,
        username: 'mario1',
        roles: [role],
        password: undefined,
      };
      userAuth = new LoginResponse(token, user);
    }
    const isCashier = req.username == 'mario2' && req.password == 'mario2p';
    if (isCashier) {
      const token = 'token2';
      const role = { id: 2, authority: 'ROLE_admin_products' };
      const user: UserModel = {
        id: 2,
        username: 'mario2',
        roles: [role],
        password: undefined,
      };
      userAuth = new LoginResponse(token, user);
    }
    const isStocker = req.username == 'mario3' && req.password == 'mario3p';
    if (isStocker) {
      const token = 'token3';
      const role = { id: 2, authority: 'ROLE_admin_sells' };
      const user: UserModel = {
        id: 3,
        username: 'mario3',
        roles: [role],
        password: undefined,
      };
      userAuth = new LoginResponse(token, user);
    }

    if (userAuth) {
      return of(userAuth).pipe(delay(environment.longDelay));
    }

    const error = { error: { message: '', cause: 'xx' } };
    return throwError(() => error).pipe(delay(environment.longDelay));
  }
}
