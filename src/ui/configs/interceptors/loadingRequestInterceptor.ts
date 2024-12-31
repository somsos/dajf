import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, catchError, tap, throwError } from 'rxjs';
import {
  clearLoadingItems,
  setLoadingItem,
} from '../../../state/loading/loading.actions';

export function loadingRequestInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const store = inject(Store<any>);

  return next(req).pipe(
    tap({
      next: () => {
        store.dispatch(setLoadingItem({ id: req.url }));
      },
      complete: () => {
        store.dispatch(clearLoadingItems());
      },
    }),
    catchError((error: any) => {
      store.dispatch(clearLoadingItems());
      return throwError(() => error);
    })
  );
}
