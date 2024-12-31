import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { EMPTY, Observable, catchError, throwError } from 'rxjs';
import { showSnackBack } from '../../../state/userMessages/msgs.actions';
import { ErrorDto } from '../../commons/ErrorDto';
import { Router } from '@angular/router';
import { clearAuthUser } from '../../../state/auth/auth.actions';
import { clearLoadingItems } from '../../../state/loading/loading.actions';

export function errorInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const store = inject(Store<any>);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      console.warn('HttpErrorResponse', error);
      const msg = ErrorDto.fromServer(error);
      store.dispatch(showSnackBack(msg));
      store.dispatch(clearLoadingItems());
      if (ErrorDto.isTokenExpiredError(msg)) {
        store.dispatch(clearAuthUser());
        return EMPTY;
      }

      const handledError = new ErrorDto(msg.message, error.message ?? '', true);
      return throwError(() => handledError);
    }),
    catchError((error: any) => {
      console.warn('unexpected error', error);
      return throwError(() => error);
    })
  );
}
