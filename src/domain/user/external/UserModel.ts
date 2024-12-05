import { IRole } from './IRole';

export class UserModel {
  constructor(
    public id: number,
    public username: string,
    public roles: IRole[],
    public password: string | undefined
  ) {}

  static isAdmin(roles?: IRole[]): boolean {
    if (!roles || roles.length <= 0) {
      return false;
    }
    const r = roles.filter((r) => r.authority == IRole.AdminRole).length > 0;
    return r;
  }

  static isCashier(roles?: IRole[]): boolean {
    if (!roles || roles.length <= 0) {
      return false;
    }
    const r = roles.filter((r) => r.authority == IRole.CashierRole).length > 0;
    return r;
  }

  static isStocker(roles?: IRole[]): boolean {
    if (!roles || roles.length <= 0) {
      return false;
    }
    const r = roles.filter((r) => r.authority == IRole.StockerRole).length > 0;
    return r;
  }

  static hasRole(roles?: IRole[], role?: IRole): boolean {
    if (!role || !roles || roles.length <= 0) {
      return false;
    }
    const r = roles.filter((r) => r.authority == role.authority).length > 0;
    return r;
  }

  static getLoginRedirectRouteByRole(roles: IRole[]): string {
    if (UserModel.isAdmin(roles)) {
      return '/admin';
    } else if (UserModel.isStocker(roles)) {
      return '/stocker';
    } else if (UserModel.isCashier(roles)) {
      return '/cashier';
    }
    throw Error(
      roles.toString() + ', it could not determine login redirect route'
    );
  }
}
