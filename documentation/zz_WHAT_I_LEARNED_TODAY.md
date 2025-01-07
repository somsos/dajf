# What I learned today

- [What I learned today](#what-i-learned-today)
  - [http request global error handling](#http-request-global-error-handling)
  - [http request loading global active and desactive (on start, complete and error)](#http-request-loading-global-active-and-desactive-on-start-complete-and-error)
  - [Use of  Utility Types](#use-of--utility-types)
  - [Use of ngrx-etc](#use-of-ngrx-etc)
  - [Use a service to wrap the ngrx/store state](#use-a-service-to-wrap-the-ngrxstore-state)

## http request global error handling

I can create a global error handling in http request (using rxjs, angular-conf) using an
interceptor, witch is pretty convenient to handle all errors from the api server.

Also In effects I can add an affect that is executed in all the user actions, that
is there to catch errors, that occurs in all the effects/actions.

Also for any error in class level, I can add a GlobalErrorHandler that the Angular
framework already define how to do it.

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

## Use of  Utility Types

- [source](https://www.typescriptlang.org/docs/handbook/utility-types.html)

With these I can use a kind of flexible hierarchy, where I can modify the structure
or behavior of a interface, type or class, So create others without weird tricks,
and keep using the help of the compiler.

## Use of ngrx-etc

- source1: https://www.npmjs.com/package/ngrx-etc
- source2: https://github.com/timdeschryver/ngrx-etc

Guardar objetos complejos no funciona, en mi caso queria guardar un objeto
que extendia de Error para tener el stacj disponible, pero no lo guarda.

## Use a service to wrap the ngrx/store state

Manage the store can be complex because is loosely coupled and flexible, so
to keep a record of what the UI requiere from the state, I create a Service that
that represent the connection between the UI and the state.
