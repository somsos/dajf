import { ERole } from './ERole';

export class UserModel {
  constructor(
    public id: number,
    public username: string,
    public roles: ERole[],
    public password: string | undefined
  ) {}

  isAdmin(): boolean {
    if (this.roles.includes(ERole.Admin)) {
      return true;
    }

    return false;
  }
}
