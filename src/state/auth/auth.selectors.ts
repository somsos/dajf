import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';

export const selectAuth = createFeatureSelector<AuthState | undefined>('auth');

export const selectLogged = createSelector(
  selectAuth,
  (auth) => auth?.userAuth
);

export const selectToken = createSelector(selectAuth, (auth) => auth?.token);
