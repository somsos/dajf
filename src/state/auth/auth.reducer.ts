import { createReducer, on } from '@ngrx/store';
import { setAutUser, clearAuthUser } from './auth.actions';
import { UserModel } from '../../domain/user/external/UserModel';

export interface AuthState {
  userAuth?: UserModel;
  token?: string;
}

export const authInitialState: AuthState = {};

export const authReducer = createReducer(
  authInitialState,
  on(clearAuthUser, (state) => authInitialState),
  on(setAutUser, (state, authResp) => {
    const newState = {
      ...state,
      userAuth: authResp.user,
      token: authResp.token,
    };
    return newState;
  })
);
