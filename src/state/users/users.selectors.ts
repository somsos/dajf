import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UsersState } from './users.reducer';

export const getUserState = createFeatureSelector<UsersState>('users');

export const selectUsers = createSelector(getUserState, (state) => {
  return state.content;
});
