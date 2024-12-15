import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  lastValueFrom,
  map,
  Observable,
  take,
  switchMap,
  catchError,
  EMPTY,
  throwError,
} from 'rxjs';
import { selectLogged } from '../../../state/auth/auth.selectors';
import { showSnackBack } from '../../../state/userMessages/msgs.actions';
import { IMessage } from '../../../state/userMessages/dto/UserMessage';
import { ErrorDto } from '../../commons/ErrorDto';

export function errorInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const store = inject(Store<any>);
  return next(req).pipe(
    catchError((error: any) => {
      console.warn('response error caught', error);
      const msg = getUserMessageFromErrorResponse(error);
      store.dispatch(showSnackBack(msg));
      const handledError = new ErrorDto(msg.message, error.message ?? '', true);
      return throwError(() => handledError);
    })
  );
}

function getUserMessageFromErrorResponse(error: any): IMessage {
  let userMsg = 'Error inesperado';
  if (error instanceof HttpErrorResponse) {
    if (error.status == 403) {
      userMsg = 'Permisos insuficientes, contacte admins';
    }
  }
  const msg: IMessage = { message: userMsg, actionLabel: 'Ok' };
  return msg;
}
