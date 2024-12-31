import { Inject, Injectable } from '@angular/core';
import {
  Actions,
  createEffect,
  CreateEffectMetadata,
  ofType,
} from '@ngrx/effects';
import { EMPTY, Observable } from 'rxjs';
import {
  map,
  exhaustMap,
  catchError,
  tap,
  filter,
  delay,
} from 'rxjs/operators';
import { AuthActionsNames, setAutUser } from './auth.actions';
import { Router } from '@angular/router';
import { Action, Store } from '@ngrx/store';
import {
  IUserService,
  userServiceName,
} from '../../domain/user/external/IUserService';
import { LoginRequest } from '../../domain/user/external/io/LoginRequest';
import { UserModel } from '../../domain/user/external/UserModel';
import { ErrorDto } from '../../ui/commons/ErrorDto';
import { showSnackBack } from '../userMessages/msgs.actions';
import { IMessage } from '../userMessages/dto/UserMessage';
import { LoginResponse } from '../../domain/user/external/io/LoginResponse';

/*
exhaustMap(() => this.moviesService.getAll()
  .pipe(
    tap(movies => ({ type: '[Movies API] Movies Loaded Success', payload: movies })),
    catchError(() => EMPTY)
  ))
)
*/

@Injectable()
export class AuthEffects {
  readonly loginRequest$: Observable<Action<string>> & CreateEffectMetadata;
  readonly setAuthUser$: Observable<LoginResponse> & CreateEffectMetadata;
  readonly logout$: Observable<void> & CreateEffectMetadata;

  constructor(
    private _store: Store<any>,
    @Inject(userServiceName) private _srv: IUserService,
    private actions$: Actions,
    private _router: Router
  ) {
    this.logout$ = this._setLogout();
    this.loginRequest$ = this._setLoginRequest();
    this.setAuthUser$ = this._setSetAuthUser();
  }

  _setLoginRequest(): any {
    return createEffect(
      () =>
        this.actions$.pipe(
          ofType(AuthActionsNames.LoginRequest),
          map((d) => d as any as LoginRequest),
          exhaustMap((reqInfo) => {
            const req = this._srv.login(reqInfo).pipe(
              map((authUser) => setAutUser(authUser)),
              catchError((err) => this._handleServerError(err))
            );
            return req;
            //
          })
        ),
      { dispatch: true }
    );
  }

  _setSetAuthUser(): Observable<LoginResponse> & CreateEffectMetadata {
    return createEffect(
      () =>
        this.actions$.pipe(
          ofType(AuthActionsNames.SetAuthUser),
          map((d) => d as any as LoginResponse),
          tap((logResp) => {
            const userRoles = logResp.user.roles;
            const route = UserModel.getLoginRedirectRouteByRole(userRoles);
            this._router.navigateByUrl(route);
          })
        ),
      { dispatch: false }
    );
  }

  _setLogout(): any {
    return createEffect(
      () =>
        this.actions$.pipe(
          ofType(AuthActionsNames.ClearAuthUser),
          tap(() => {
            this._router.navigateByUrl('/login');
          })
        ),
      { dispatch: false }
    );
  }

  _handleServerError(err: any): Observable<never> {
    console.warn('_handleServerError:', err);
    const error = ErrorDto.fromServer(err.error);
    const msg: IMessage = {
      message: error.message,
      actionLabel: 'Ok',
    };
    this._store.dispatch(showSnackBack(msg));
    return EMPTY;
  }
}
