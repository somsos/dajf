import { Inject, Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import {
  map,
  exhaustMap,
  catchError,
  filter,
  tap,
  first,
  take,
  delay,
  takeUntil,
  takeWhile,
} from 'rxjs/operators';
import { IUsersApi, usersApiName } from '../../server/IUserApi';
import { UserActions, UserNames } from './users.actions';
import { IPageDto } from '../../domain/common/dto/IPageDto';
import { UserModel } from '../../domain/user/external/UserModel';

@Injectable()
export class UsersEffects {
  private actions$ = inject(Actions);

  constructor(@Inject(usersApiName) private _api: IUsersApi) {}

  loadUsersPage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.loadUsers),
      exhaustMap((req) =>
        this._api.findByPage(req.data).pipe(
          map((page) => ({
            type: UserNames.setUsers,
            page: page,
          }))
        )
      )
    );
  });

  addUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.addUser),
      exhaustMap((action) =>
        this._api.addUser(action.data).pipe(
          map((added) => ({
            type: UserNames.setUser,
            data: added,
          })),
          catchError((err) => {
            console.warn('error on effect', err);
            return EMPTY;
          })
        )
      )
    );
  });
}
