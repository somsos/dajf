import { Observable } from 'rxjs';
import { UsersState } from '../state/users/users.reducer';
import { UserModel } from '../domain/user/external/UserModel';
import { IPageDto } from '../domain/common/dto/IPageDto';

export const usersApiName = 'usersApi';

export const EPUsers = '/users';
export const EPUsersPage =
  EPUsers + '?pageNumber=${pageNumber}&itemsPerPage=${itemsPerPage}';

export interface IUsersApi {
  findByPage(req: IPageDto<UserModel>): Observable<UsersState>;

  addUser(toAdd: UserModel): Observable<UserModel>;
}
