import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { IRole } from '../../../domain/user/external/IRole';
import {
  checkAccess,
  showGenericLackOfPermissionsMessage,
} from './guards-commons';

export const adminGuard: CanActivateFn = async (route, state) => {
  const store = inject(Store);
  const roleToFind = { id: -1, authority: IRole.AdminRole };
  const canAccess = await checkAccess(store, roleToFind);
  if (canAccess == false) {
    showGenericLackOfPermissionsMessage(store);
  }
  return canAccess;
};

export const stockerGuard: CanActivateFn = async (route, state) => {
  const store = inject(Store);
  const roleToFind = { id: -1, authority: IRole.StockerRole };
  const canAccess = await checkAccess(store, roleToFind);
  if (canAccess == false) {
    showGenericLackOfPermissionsMessage(store);
  }
  return canAccess;
};

export const cashierGuard: CanActivateFn = async (route, state) => {
  const store = inject(Store);
  const roleToFind = { id: -1, authority: IRole.CashierRole };
  const canAccess = await checkAccess(store, roleToFind);
  if (canAccess == false) {
    showGenericLackOfPermissionsMessage(store);
  }
  return canAccess;
};
