import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { lastValueFrom, map, Observable, take, switchMap } from 'rxjs';
import { selectLogged } from '../../../state/auth/auth.selectors';
import { endpointProducts } from '../../../server/IProductApi';

interface Endpoint {
  method: 'get' | 'post' | 'put' | 'delete';
  url: string;
}

const routesToAddToken: Endpoint[] = [
  { method: 'post', url: endpointProducts },
];

export function tokenInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const isForAdd =
    routesToAddToken.filter(
      (ep) => ep.method == req.method && ep.url == req.url
    ).length > 0;
  if (isForAdd == false) {
    return next(req);
  }

  const store = inject(Store<any>);
  return store.select(selectLogged).pipe(
    switchMap((auth) => {
      if (!auth) {
        console.warn('expected to add token bet auth is undefined');
        return next(req);
      }
      console.debug('adding token to request');
      req.headers.set('token', 'aaa');
      return next(req);
    })
  );
}
