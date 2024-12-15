import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  lastValueFrom,
  map,
  Observable,
  take,
  switchMap,
  throwError,
} from 'rxjs';
import { selectToken } from '../../../state/auth/auth.selectors';
import {
  endpointProducts,
  endpointProductImage,
} from '../../../server/IProductApi';

interface Endpoint {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  url: string;
}

const routesToAddToken: Endpoint[] = [
  { method: 'POST', url: endpointProducts },
  { method: 'DELETE', url: endpointProductImage },
];

export function tokenInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const isForAdd =
    routesToAddToken.filter((ep) => {
      const urlAndMethodMatch = ep.method == req.method && ep.url == req.url;
      const methodIsDelete = req.method == 'DELETE';
      return urlAndMethodMatch || methodIsDelete;
    }).length > 0;
  if (isForAdd == false) {
    return next(req);
  }

  const store = inject(Store<any>);
  return store.select(selectToken).pipe(
    switchMap((token) => {
      console.debug('adding token to request');
      if (!token) {
        console.warn('expected to add token bet auth is undefined');
        return throwError(() => new Error('permisos insuficientes'));
      }
      const reqWToken = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`),
      });
      return next(reqWToken);
    })
  );
}
