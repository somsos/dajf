import { ERole } from './ERole';

export class UserModel {
  constructor(
    public id: number,
    public username: string,
    public roles: ERole[],
    public password: string | undefined
  ) {}

  static isAdmin(roles: ERole[]): boolean {
    if (roles.includes(ERole.Admin)) {
      return true;
    }

    return false;
  }

  static isCashier(roles: ERole[]): boolean {
    if (roles.includes(ERole.Cashier)) {
      return true;
    }

    return false;
  }

  static isStocker(roles: ERole[]): boolean {
    if (roles.includes(ERole.Stocker)) {
      return true;
    }

    return false;
  }

  static getLoginRedirectRouteByRole(roles: ERole[]): string {
    if (roles.includes(ERole.Admin)) {
      return '/admin';
    } else if (roles.includes(ERole.Stocker)) {
      return '/stocker';
    } else if (roles.includes(ERole.Cashier)) {
      return '/cashier';
    }
    throw Error(ERole.Admin + ', it could not determine login redirect route');
  }
}
