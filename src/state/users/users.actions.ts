import { createAction, props } from '@ngrx/store';
import { UsersState } from './users.reducer';
import { UserModel } from '../../domain/user/external/UserModel';
import { IPageDto } from '../../domain/common/dto/IPageDto';

export const UserNames = {
  loadUsers: '[User/API] Load Users',
  setUsers: '[User/Store] Set Users',
  saveUser: '[User/API] save user',
  setUser: '[User/Store] set user',
  apiUpdate: '[User/API] update user',
  storeUpdate: '[User/Store] update user',
};

const updateUser = createAction(
  UserNames.apiUpdate,
  props<{ data: UserModel }>()
);

const loadUsers = createAction(
  UserNames.loadUsers,
  props<{ data: IPageDto<UserModel> }>()
);

export const setUsers = createAction(
  UserNames.setUsers,
  props<{ page: UsersState }>()
);

export const addUser = createAction(
  UserNames.saveUser,
  props<{ data: UserModel }>()
);

export const setUser = createAction(
  UserNames.setUser,
  props<{ data: UserModel }>()
);

export const update = createAction(
  UserNames.storeUpdate,
  props<{ data: UserModel }>()
);

export const UserActions = {
  loadUsers,
  setUsers,
  addUser,
  setUser,
  update,
};
