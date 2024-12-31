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
  endpointUploadImage,
} from '../../../server/IProductApi';
import { UrlUtils } from '../../../domain/common/UrlUtils';
import { ErrorDto, tokenDoNotExist } from '../../commons/ErrorDto';

interface Endpoint {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  url: string;
}

const routesToAddToken: Endpoint[] = [
  { method: 'POST', url: endpointProducts },
  { method: 'DELETE', url: endpointProductImage },
  { method: 'PUT', url: endpointProducts + '/1' },
  { method: 'POST', url: endpointUploadImage.replace('{$id}', '1') },
];

export function tokenInterceptor(
  currentReq: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const candidateToAddToken = compareWithUrlsToAddToken(currentReq);
  if (candidateToAddToken == false) {
    return next(currentReq);
  }

  const store = inject(Store<any>);
  return store.select(selectToken).pipe(
    switchMap((token) => {
      console.debug('adding token to request');
      if (!token) {
        return throwError(() => tokenDoNotExist);
      }
      const reqWToken = currentReq.clone({
        headers: currentReq.headers.set('Authorization', `Bearer ${token}`),
      });
      return next(reqWToken);
    })
  );
}

function compareWithUrlsToAddToken(currentReq: HttpRequest<unknown>): boolean {
  for (let i = 0; i < routesToAddToken.length; i++) {
    const pathToAddToken = routesToAddToken[i];
    const matchMethod = pathToAddToken.method == currentReq.method;
    const simplifiedCurrentUrl = UrlUtils.reduceParams(currentReq.url);
    const matchPath = pathToAddToken.url == simplifiedCurrentUrl;
    const matchRequest = matchMethod && matchPath;
    const methodIsDelete = currentReq.method == 'DELETE';
    const candidateToAddToken = matchRequest || methodIsDelete;
    if (candidateToAddToken == true) {
      return true;
    }
  }
  return false;
}
