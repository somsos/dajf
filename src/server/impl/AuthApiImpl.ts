import { Observable, take } from 'rxjs';
import { LoginRequest } from '../../domain/user/external/io/LoginRequest';
import { LoginResponse } from '../../domain/user/external/io/LoginResponse';
import { IAuthApi } from '../IAuthApi';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { environment } from '../../environment/environment';

export class AuthApiImpl implements IAuthApi {
  private readonly _http = inject(HttpClient);

  private static readonly epLogin = environment.host + '/auth/create-token';

  login(req: LoginRequest): Observable<LoginResponse> {
    return this._http
      .post<LoginResponse>(AuthApiImpl.epLogin, req)
      .pipe(take(1));
  }
}
