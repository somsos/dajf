import { Inject, Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, exhaustMap, catchError, tap } from 'rxjs/operators';
import { IUsersApi, usersApiName } from '../../server/IUserApi';
import { UserActions, UserNames } from './users.actions';

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
        this._api.add(action.data).pipe(
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

  update$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserNames.apiUpdate),
      exhaustMap((action) =>
        this._api.update(action.data).pipe(
          map((newInfo) => ({
            type: UserNames.storeUpdate,
            data: newInfo,
          })),
          catchError((err) => {
            return EMPTY;
          })
        )
      )
    );
  });

  deleteById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserNames.apiDeleteById),
      exhaustMap((action) =>
        this._api.deleteById(action.data).pipe(
          map((newInfo) => ({
            type: UserNames.storeDeleteById,
            data: newInfo,
          })),
          catchError((err) => {
            return EMPTY;
          })
        )
      )
    );
  });
}
