import { Inject, Injectable } from '@angular/core';
import {
  Actions,
  createEffect,
  CreateEffectMetadata,
  ofType,
} from '@ngrx/effects';
import { EMPTY, Observable } from 'rxjs';
import { map, exhaustMap, catchError, tap, filter } from 'rxjs/operators';
import { AuthActionsNames, setAutUser } from './auth.actions';
import { Router } from '@angular/router';
import { Action } from '@ngrx/store';
import { IUserService } from '../../domain/user/external/IUserService';
import { LoginRequest } from '../../domain/user/external/io/LoginRequest';
import { UserModel } from '../../domain/user/external/UserModel';

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
  readonly setAuthUser$: Observable<UserModel> & CreateEffectMetadata;
  readonly logout$: Observable<void> & CreateEffectMetadata;

  constructor(
    @Inject('UserService') private _srv: IUserService,
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
              catchError((err) => this._handleError(err))
            );
            return req;
            //
          })
        ),
      { dispatch: true }
    );
  }

  _setSetAuthUser(): Observable<UserModel> & CreateEffectMetadata {
    return createEffect(
      () =>
        this.actions$.pipe(
          ofType(AuthActionsNames.SetAuthUser),
          map((d) => d as any as UserModel),
          tap((assignedUser) => {
            const route = UserModel.getLoginRedirectRouteByRole(
              assignedUser.roles
            );
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

  _handleError(err: any): Observable<never> {
    console.warn(err);
    return EMPTY;
  }
}
