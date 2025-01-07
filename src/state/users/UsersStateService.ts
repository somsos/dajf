import { Observable } from 'rxjs';
import { UserModel } from '../../domain/user/external/UserModel';
import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { getUserState, selectUsers } from './users.selectors';
import { UserNames } from './users.actions';
import { UrlUtils } from '../../domain/common/UrlUtils';
import { EPUsersPage } from '../../server/IUserApi';
import { existLoading } from '../loading/loading.selectors';
import { IPageDto } from '../../domain/common/dto/IPageDto';
import { UsersState } from './users.reducer';

@Injectable({ providedIn: 'root' })
export class UserStateService {
  private _store = inject(Store);

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
}
