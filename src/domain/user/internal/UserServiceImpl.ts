import { Observable, of, throwError } from 'rxjs';
import { IUserService } from '../external/IUserService';
import { UserModel } from '../external/UserModel';
import { ERole } from '../external/ERole';
import { LoginRequest } from '../external/io/LoginRequest';

export class UserServiceImpl implements IUserService {
  login(loginReqInfo: LoginRequest): Observable<UserModel> {
    let userAuth: UserModel | undefined;

    const isAdmin =
      loginReqInfo.username == 'admin' && loginReqInfo.password == 'admin';
    if (isAdmin) {
      userAuth = new UserModel(1, 'admin', [ERole.Admin], undefined);
    }

    const isCashier =
      loginReqInfo.username == 'cashier' && loginReqInfo.password == 'cashier';
    if (isCashier) {
      userAuth = new UserModel(1, 'cashier', [ERole.Cashier], undefined);
    }

    const isStocker =
      loginReqInfo.username == 'stocker' && loginReqInfo.password == 'stocker';
    if (isStocker) {
      userAuth = new UserModel(1, 'Stocker', [ERole.Stocker], undefined);
    }

    if (userAuth) {
      return of(userAuth);
    }

    return throwError(() => new Error('wrong user or password'));
  }
}
