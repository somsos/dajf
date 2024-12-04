import { createSelector, createFeatureSelector } from '@ngrx/store';
import { MsgsState } from './msgs.reducer';

export const selectMsgs = createFeatureSelector<MsgsState | undefined>('msgs');

export const selectSnackBar = createSelector(
  selectMsgs,
  (msgs) => msgs?.snackBar
);
