import { createAction, props } from '@ngrx/store';
import { UserModel } from '../../domain/user/external/UserModel';

export const login = createAction('[Auth] Login', props<{ user: UserModel }>());
export const logout = createAction('[Auth] Logout');
