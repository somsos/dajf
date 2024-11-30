import { createReducer, on } from '@ngrx/store';
import { login, logout } from './auth.actions';
import { UserModel } from '../../domain/user/external/UserModel';

export interface AuthState {
  userAuth?: UserModel;
}

export const authInitialState: AuthState = {
  //userAuth: new UserModel(1, 'some', [], undefined),
  userAuth: undefined,
};

export const authReducer = createReducer(
  authInitialState,
  on(login, (state, { user }) => ({ ...state, userAuth: user }))
  //on(logout, (state) => state - 1),
);
