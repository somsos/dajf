import { UserModel } from '../../domain/user/external/UserModel';
import { createReducer, on } from '@ngrx/store';
import { UserActions } from './users.actions';
import { mutableOn } from 'ngrx-etc';

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
  }),
  mutableOn(UserActions.update, (state, { data }) => {
    const iToUpdate = state.content.findIndex((u) => u.id == data.id);
    state.content[iToUpdate] = data;
  }),
  mutableOn(UserActions.storeDeleteById, (state, { data }) => {
    const indexToDelete = state.content.findIndex((u) => u.id == data);
    state.content = [
      ...state.content.slice(0, indexToDelete),
      ...state.content.slice(indexToDelete + 1),
    ];
  })
);
