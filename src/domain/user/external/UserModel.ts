import { AppEntity } from '../../common/dto/IEntity';
import { StringUtils } from '../../common/StringUtils';
import { IRole } from './IRole';

export class UserModel extends AppEntity {
  constructor(
    idArg: number,
    public username: string,
    public email: string,
    public roles: IRole[] = [],
    public password: string | undefined
  ) {
    super(idArg, new Date());
  }

  static prepareAndValidateToAdd(check: UserModel): boolean {
    if (StringUtils.trimAndCheckIsNotEmpty(check.username) == false) {
      return false;
    }

    if (StringUtils.trimAndCheckIsNotEmpty(check.email) == false) {
      return false;
    }

    if (StringUtils.trimAndCheckIsNotEmpty(check.password) == false) {
      return false;
    }

    return true;
  }

  static clone(source: UserModel): UserModel {
    const cloned: UserModel = {
      username: source.username,
      id: source.id,
      email: source.email,
      roles: source.roles,
      password: source.password,
      createAt: new Date(),
    };
    console.log('cloned', cloned);
    return cloned;
  }

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
