import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UsersState } from './users.reducer';
import { Observable, throwError } from 'rxjs';
import { ErrorDto } from '../../ui/commons/ErrorDto';
import { UserModel } from '../../domain/user/external/UserModel';

export const getUserState = createFeatureSelector<UsersState>('users');

export const selectUsers = createSelector(getUserState, (state) => {
  return state.content;
});

export const selectUserById = (id: number) =>
  createSelector(selectUsers, (users) => {
    const found = users.filter((u) => u.id === id)[0];
    return found;
  });
