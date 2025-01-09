import { delay, first, Observable, of, tap, throwError } from 'rxjs';
import { UsersState } from '../../state/users/users.reducer';
import { EPUsersPage, EPUsers, IUsersApi } from '../IUserApi';
import { UserModel } from '../../domain/user/external/UserModel';
import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  clearLoadingItems,
  setLoadingItem,
} from '../../state/loading/loading.actions';
import { UrlUtils } from '../../domain/common/UrlUtils';
import { IPageDto } from '../../domain/common/dto/IPageDto';
import { IRole } from '../../domain/user/external/IRole';
import { RequestStateHelper } from '../../state/requests/RequestStateHelper';
import { ErrorDto } from '../../ui/commons/ErrorDto';

@Injectable({
  providedIn: 'root',
})
export class UsersApiMock implements IUsersApi {
  private _store = inject(Store<any>);
  private _requestState = inject(RequestStateHelper);

  findByPage(req: IPageDto<UserModel>): Observable<UsersState> {
    const urlIdLoading = UrlUtils.reduceParams(EPUsersPage);
    this._store.dispatch(setLoadingItem({ id: urlIdLoading }));
    const start = req.pageNumber * req.itemsPerPage;
    const end = start + req.itemsPerPage;

    const pageContent = allUsers.slice(start, end);
    const resp: UsersState = {
      content: pageContent,
      itemsPerPage: req.itemsPerPage,
      pageNumber: req.pageNumber,
      totalItems: allUsers.length,
      userOnFocus: undefined,
    };
    return of(resp).pipe(
      delay(2000),
      tap({
        complete: () => {
          this._store.dispatch(clearLoadingItems());
        },
      })
    );
  }

  add(input: UserModel): Observable<UserModel> {
    const output = UserModel.clone(input);
    output.id = allUsers.length + 1;
    try {
      let newState: UserModel[] = [];
      Object.assign(newState, allUsers);
      newState.unshift(output);
      allUsers = newState;
    } catch (error) {
      return throwError(() => error);
    }

    const idReq = this._requestState.getLastAndMarkItAsCaught();

    return of(output).pipe(
      delay(2000),
      first(),
      tap({
        complete: () => {
          this._requestState.setSuccess(idReq);
        },
        error: (error) => {
          this._requestState.setFailed(idReq, error);
        },
      })
    );
  }

  update(newInfo: UserModel): Observable<UserModel> {
    console.log('api updating');
    const indexToUpdate = allUsers.findIndex((u) => u.id == newInfo.id);
    if (indexToUpdate == -1) {
      const msg = 'Usuario a modificar no encontrado';
      return throwError(() => new ErrorDto(msg, ''));
    }
    allUsers[indexToUpdate] = newInfo;

    const idReq = this._requestState.getLastAndMarkItAsCaught();

    return of(newInfo).pipe(
      delay(2000),
      first(),
      tap({
        complete: () => {
          this._requestState.setSuccess(idReq);
        },
        error: (error) => {
          this._requestState.setFailed(idReq, error);
        },
      })
    );
  }
}

interface Rol {
  id: number;
  authority: string;
}

const roles = {
  users: { id: 1, authority: 'admin_users' },
  products: { id: 2, authority: 'admin_products' },
  sells: { id: 3, authority: 'admin_sells' },
  public: { id: 4, authority: 'public' },
};

let allUsers: UserModel[] = [
  {
    id: 1,
    username: 'mario1',
    email: 'some@email.com',
    roles: [roles.users, roles.products, roles.sells],
    password: undefined,
    createAt: new Date(),
  },
  {
    id: 2,
    username: 'mario2',
    email: 'some@email.com',
    roles: [roles.products, roles.sells],
    password: undefined,
    createAt: new Date(),
  },
  {
    id: 3,
    username: 'mario3',
    email: 'some@email.com',
    roles: [roles.sells],
    password: undefined,
    createAt: new Date(),
  },
  {
    id: 4,
    username: 'mario4',
    email: 'some@email.com',
    roles: [],
    password: undefined,
    createAt: new Date(),
  },
  {
    id: 5,
    username: 'mario5',
    email: 'some@email.com',
    roles: [roles.public],
    password: undefined,
    createAt: new Date(),
  },
  {
    id: 6,
    username: 'mario6',
    email: 'some@email.com',
    roles: [roles.public],
    password: undefined,
    createAt: new Date(),
  },
  {
    id: 7,
    username: 'mario7',
    email: 'some@email.com',
    roles: [roles.public],
    password: undefined,
    createAt: new Date(),
  },
  {
    id: 8,
    username: 'mario8',
    email: 'some@email.com',
    roles: [roles.public],
    password: undefined,
    createAt: new Date(),
  },
  {
    id: 9,
    username: 'mario9',
    email: 'some@email.com',
    roles: [roles.public],
    password: undefined,
    createAt: new Date(),
  },
  {
    id: 10,
    username: 'mario10',
    email: 'some@email.com',
    roles: [roles.public],
    password: undefined,
    createAt: new Date(),
  },
  {
    id: 11,
    username: 'mario11',
    email: 'some@email.com',
    roles: [roles.public],
    password: undefined,
    createAt: new Date(),
  },
  {
    id: 12,
    username: 'mario12',
    email: 'some@email.com',
    roles: [roles.public],
    password: undefined,
    createAt: new Date(),
  },
  {
    id: 13,
    username: 'mario13',
    email: 'some@email.com',
    roles: [roles.public],
    password: undefined,
    createAt: new Date(),
  },
  {
    id: 14,
    username: 'mario14',
    email: 'some@email.com',
    roles: [roles.public],
    password: undefined,
    createAt: new Date(),
  },
  {
    id: 15,
    username: 'mario15',
    email: 'some@email.com',
    roles: [roles.public],
    password: undefined,
    createAt: new Date(),
  },
  {
    id: 16,
    username: 'mario16',
    email: 'some@email.com',
    roles: [roles.public],
    password: undefined,
    createAt: new Date(),
  },
  {
    id: 17,
    username: 'mario17',
    email: 'some@email.com',
    roles: [roles.public],
    password: undefined,
    createAt: new Date(),
  },
  {
    id: 18,
    username: 'mario18',
    email: 'some@email.com',
    roles: [roles.public],
    password: undefined,
    createAt: new Date(),
  },
  {
    id: 19,
    username: 'mario19',
    email: 'some@email.com',
    roles: [roles.public],
    password: undefined,
    createAt: new Date(),
  },
  {
    id: 20,
    username: 'mario20',
    email: 'some@email.com',
    roles: [roles.public],
    password: undefined,
    createAt: new Date(),
  },
];
