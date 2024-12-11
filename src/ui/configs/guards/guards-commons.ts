import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import { IRole } from '../../../domain/user/external/IRole';
import { UserModel } from '../../../domain/user/external/UserModel';
import { selectLogged } from '../../../state/auth/auth.selectors';
import { IMessage } from '../../../state/userMessages/dto/UserMessage';
import { showSnackBack } from '../../../state/userMessages/msgs.actions';

export async function checkAccess(
  store: Store<any>,
  role: IRole
): Promise<boolean> {
  const auth = await getAuth(store);
  const isAdmin = UserModel.isAdmin(auth?.roles);
  const canAccess = UserModel.hasRole(auth?.roles, role) || isAdmin;
  return canAccess;
}

export function showGenericLackOfPermissionsMessage(store: Store<any>) {
  const msg: IMessage = {
    message: 'Acceso restringido, permisos insuficientes',
    actionLabel: 'Ok',
  };
  showSnackBar(store, msg);
}

function getAuth(store: Store<any>): Promise<UserModel | undefined> {
  return new Promise((res, err) => {
    const auth$ = store.select(selectLogged);
    let user: UserModel | undefined;
    auth$.pipe(take(1)).subscribe((found) => (user = found));
    res(user);
  });
}

function showSnackBar(store: Store<any>, msg: IMessage) {
  store.dispatch(showSnackBack(msg));
}
