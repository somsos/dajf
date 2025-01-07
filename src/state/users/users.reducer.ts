import { UserModel } from '../../domain/user/external/UserModel';
import { createReducer, on } from '@ngrx/store';
import { UserActions } from './users.actions';

export interface UsersState {
  pageNumber: number;
  itemsPerPage: number;
  totalItems: number;
  content: UserModel[];
  userOnFocus?: UserModel;
}

export const initialState: UsersState = {
  itemsPerPage: 10,
  pageNumber: 0,
  totalItems: 0,
  content: [],
};

export const usersReducer = createReducer(
  initialState,
  on(UserActions.setUsers, (state, { page }) => {
    const newState = { ...state, ...page };
    return newState;
  })
);
