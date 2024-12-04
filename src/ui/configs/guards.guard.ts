import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { ERole } from '../../domain/user/external/ERole';
import {
  checkAccess,
  showGenericLackOfPermissionsMessage,
} from './guards-commons';

export const adminGuard: CanActivateFn = async (route, state) => {
  const store = inject(Store);
  const canAccess = await checkAccess(store, ERole.Admin);
  if (canAccess == false) {
    showGenericLackOfPermissionsMessage(store);
  }
  return canAccess;
};

export const stockerGuard: CanActivateFn = async (route, state) => {
  const store = inject(Store);
  const canAccess = await checkAccess(store, ERole.Stocker);
  if (canAccess == false) {
    showGenericLackOfPermissionsMessage(store);
  }
  return canAccess;
};

export const cashierGuard: CanActivateFn = async (route, state) => {
  const store = inject(Store);
  const canAccess = await checkAccess(store, ERole.Cashier);
  if (canAccess == false) {
    showGenericLackOfPermissionsMessage(store);
  }
  return canAccess;
};
