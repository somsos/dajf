import { createAction, props } from '@ngrx/store';
import { UserModel } from '../../domain/user/external/UserModel';
import { LoginRequest } from '../../domain/user/external/io/LoginRequest';

export const AuthActionsNames = {
  LoginRequest: '[Auth] Request Login',
  SetAuthUser: '[Auth] Set Auth User',
  ClearAuthUser: '[Auth] Clear Auth User',
};

export const loginRequest = createAction(
  AuthActionsNames.LoginRequest,
  props<LoginRequest>()
);

export const setAutUser = createAction(
  AuthActionsNames.SetAuthUser,
  props<UserModel>()
);

export const clearAuthUser = createAction(AuthActionsNames.ClearAuthUser);
