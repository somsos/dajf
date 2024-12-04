import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import { ERole } from '../../domain/user/external/ERole';
import { UserModel } from '../../domain/user/external/UserModel';
import { selectLogged } from '../../state/auth/auth.selectors';
import { IMessage } from '../../state/userMessages/dto/UserMessage';
import { showMessage } from '../../state/userMessages/msgs.actions';

export async function checkAccess(
  store: Store<any>,
  role: ERole
): Promise<boolean> {
  const auth = await getAuth(store);
  const isAdmin = auth! && auth.roles.includes(ERole.Admin);
  const canAccess = (auth! && auth.roles.includes(role)) || isAdmin;
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
  store.dispatch(showMessage(msg));
}
