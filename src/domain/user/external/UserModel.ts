import { ERole } from './ERole';

export class UserModel {
  constructor(
    public id: number,
    public username: string,
    public roles: ERole[],
    public password: string | undefined
  ) {}
}
