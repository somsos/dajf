import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { EMPTY, Observable, catchError, throwError } from 'rxjs';
import { showSnackBack } from '../../../state/userMessages/msgs.actions';
import { ErrorDto } from '../../commons/ErrorDto';
import { Router } from '@angular/router';
import { clearAuthUser } from '../../../state/auth/auth.actions';

export function errorInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const store = inject(Store<any>);
  return next(req).pipe(
    catchError((error: any) => {
      console.warn('response error caught', error);
      const msg = ErrorDto.fromServer(error);
      store.dispatch(showSnackBack(msg));
      if (ErrorDto.isTokenExpiredError(msg)) {
        store.dispatch(clearAuthUser());
        return EMPTY;
      }

      const handledError = new ErrorDto(msg.message, error.message ?? '', true);
      return throwError(() => handledError);
    })
  );
}
