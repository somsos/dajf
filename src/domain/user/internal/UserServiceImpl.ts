import { Observable, of, throwError } from 'rxjs';
import { IUserService } from '../external/IUserService';
import { UserModel } from '../external/UserModel';
import { ERole } from '../external/ERole';
import { LoginRequest } from '../external/io/LoginRequest';

export class UserServiceImpl implements IUserService {
  login(loginReqInfo: LoginRequest): Observable<UserModel> {
    if (loginReqInfo.username == 'admin' && loginReqInfo.password == 'admin') {
      const u = new UserModel(1, 'admin', [ERole.Admin], undefined);
      return of(u);
    }

    if (
      loginReqInfo.username == 'cashier' &&
      loginReqInfo.password == 'cashier'
    ) {
      const u = new UserModel(1, 'cashier', [ERole.Cashier], undefined);
      return of(u);
    }

    if (
      loginReqInfo.username == 'stocker' &&
      loginReqInfo.password == 'stocker'
    ) {
      const u = new UserModel(1, 'Stocker', [ERole.Stocker], undefined);
      return of(u);
    }

    return throwError(() => new Error('wrong user or password'));
  }
}
