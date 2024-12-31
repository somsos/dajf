# What I learned today

## http request global error handling

I can create a global error handling in http request (using rxjs, angular-conf) using an
interceptor, witch is pretty convenient to handle all errors from the api server.

## http request loading global active and desactive (on start, complete and error)

We use an http-rxjs-angularConf interceptor that adds the url to the ngrx state,
that have an array of strings, then in the component we observe in that array
for an url that include a substring that we know is in the request we what to
show the loading.

State

```ts
export interface LoadingsState {
  activeLoadings: string[];
}
```

Selector

```ts
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { LoadingsState } from './loading.reducer';

export const selectLoadings = createFeatureSelector<LoadingsState>('loadings');

export const existLoading = (idSp: string) =>
  createSelector(selectLoadings, (state: LoadingsState): boolean => {
    const exists: boolean =
      state.activeLoadings.filter((act) => act.includes(idSp)).length >= 1;
    return exists;
  });

```

Interceptor

```ts
import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { clearLoadingItems, setLoadingItem, } from '../../../state/loading/loading.actions';

export function loadingRequestInterceptor( req: HttpRequest<unknown>, next: HttpHandlerFn ): Observable<HttpEvent<unknown>> {
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
```

Component

```ts
this._store
  .select(existLoading('create-token'))
  .pipe(takeUntilDestroyed(this.destroyRef))
  .subscribe((v) => {
    this.isLoginSubmitLoading = v;
  });
```
