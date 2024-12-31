import { createAction, props } from '@ngrx/store';
import { LoadingActionSto } from './sto/LoadingActionSto';

export const AuthActionsNames = {
  setLoadingItem: '[Loading] Set loading item',
  clearLoadingItem: '[Loading] Clear loading item',
};

export const setLoadingItem = createAction(
  AuthActionsNames.setLoadingItem,
  props<LoadingActionSto>()
);

export const clearLoadingItems = createAction(
  AuthActionsNames.clearLoadingItem
);
