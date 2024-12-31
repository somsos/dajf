import { createSelector, createFeatureSelector } from '@ngrx/store';
import { LoadingsState } from './loading.reducer';

export const selectLoadings = createFeatureSelector<LoadingsState>('loadings');

export const existLoading = (idSp: string) =>
  createSelector(selectLoadings, (state: LoadingsState): boolean => {
    const exists: boolean =
      state.activeLoadings.filter((act) => act.includes(idSp)).length >= 1;
    return exists;
  });
