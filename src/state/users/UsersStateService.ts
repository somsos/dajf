import { first, Observable } from 'rxjs';
import { UserModel } from '../../domain/user/external/UserModel';
import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { getUserState, selectUserById, selectUsers } from './users.selectors';
import { UserNames } from './users.actions';
import { UrlUtils } from '../../domain/common/UrlUtils';
import { EPUsersPage } from '../../server/IUserApi';
import { existLoading } from '../loading/loading.selectors';
import { IPageDto } from '../../domain/common/dto/IPageDto';
import { UsersState } from './users.reducer';
import { RequestStateHelper } from '../requests/RequestStateHelper';
import { IRequestDto } from '../requests/IRequestDto';

interface ActionRequestType<T> {
  type: string;
  data: T;
}

@Injectable({ providedIn: 'root' })
export class UserStateService {
  private _store = inject(Store);
  private _requestState = inject(RequestStateHelper);

  watchUsersPage(): Observable<UsersState> {
    return this._store.select(getUserState);
  }

  watchUsersPageLoading(): Observable<boolean> {
    return this._store.select(existLoading(UrlUtils.reduceParams(EPUsersPage)));
  }

  dispatchActionLoadUsersPage(req: Partial<IPageDto<UserModel>>) {
    const action = {
      type: UserNames.loadUsers,
      data: req,
    };
    this._store.dispatch(action);
  }

  selectUserById(id: number): Observable<UserModel> {
    return this._store.select(selectUserById(id)).pipe(first());
  }

  dispatchRequestActionUpdateUser(
    toUpdate: UserModel
  ): Observable<IRequestDto<unknown>> {
    return this._requestState.dispatchRequest(UserNames.apiUpdate, toUpdate);
  }

  dispatchRequestActionAddUser(
    toAdd: UserModel
  ): Observable<IRequestDto<unknown>> {
    const reqStatus = this._requestState.dispatchRequest(
      UserNames.saveUser,
      toAdd
    );
    return reqStatus;
  }

  dispatchRequestActionDeleteById(
    idUser: number
  ): Observable<IRequestDto<unknown>> {
    return this._requestState.dispatchRequest(UserNames.apiDeleteById, idUser);
  }
}
