# What I learned today

- [What I learned today](#what-i-learned-today)
  - [http request global error handling](#http-request-global-error-handling)
  - [http request loading global active and desactive (on start, complete and error)](#http-request-loading-global-active-and-desactive-on-start-complete-and-error)
  - [Use of  Utility Types](#use-of--utility-types)
  - [Use of ngrx-etc](#use-of-ngrx-etc)
  - [Use a service to wrap the ngrx/store state](#use-a-service-to-wrap-the-ngrxstore-state)
  - [How to create modules that doen't interdepend beewten them](#how-to-create-modules-that-doent-interdepend-beewten-them)
  - [Pitfalls](#pitfalls)

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

- [source1](https://www.npmjs.com/package/ngrx-etc)
- [source2](https://github.com/timdeschryver/ngrx-etc)

Guardar objetos complejos no funciona, en mi caso queria guardar un objeto
que extendia de Error para tener el stacj disponible, pero no lo guarda.

## Use a service to wrap the ngrx/store state

Manage the store can be complex because is loosely coupled and flexible, so
to keep a record of what the UI requiere from the state, I create a Service that
that represent the connection between the UI and the state.

## How to create modules that doen't interdepend beewten them

We can have an isolated module, follgin the internal and extennal folders, and
the external folder just expose dtos that are contained in the common folder,
for example:

**Note: The tricky part** is that we need to pass/copy/move from the public part of
our module, to the common modules, each module sums files to common, this because
the other modules can communicate with the module we just add, and the time we
move our module to other project (that will require we take the common module
as well), our module is still working, and for much there will be an error, of
implementation not found, but with the interface we easily can implement a new
one or discover what other module should we implement or bring of our old project.

```r
app/
  common/
    dtos/
      UserDto.ts
      ProductDto.ts
      ErrorDto.ts
    helpers/
      ApiHelper.ts
      StateHelper.ts
    types/
      AppEntity.ts
      AppPAge<E extends AppEntity>.ts
    utils
      StringUtils.ts
  
  auth/
    internal/
      api/
        reqAndResp/
          LoginRequest.ts
          LoginResponse.ts
        AuthApi.ts
    AuthUIComponnets.index.ts <- to wrapper pages, Componets, routes, etc. to use in the adapter
    AuthHttpInterceptors.ts
    IAuthHelper.ts <- to use in other modules
    ---
      // this file we move it to commons, so we can use it in any other module.
      interface IAuthHelper {
        getAuthUser(): ProductDto;
        authUserCanAccessTo(path: string): boolean;
      }
    ---
    index.adapter.ts <- elements to export to the adapter
    index.commons.ts <- element to export to commons
    README.md <- explain how to use the module, in commons (import and export) and modules (how to use) and in adapter (hot to deliver to the user).
  products/
    internals/
    ProductUIComponnets.index.ts <- to wrapper of clases to use in the adapter
    ProductHelper.ts <- to use in other modules
  auth/
    ...

```

the thruth is that it doen't worth it to have separated the code of the
different layers for example, domain~logic, server~dao, ui~view, because, it's
rarely probable we use them individualy and more probable to losse the inter
module dependency graph, because we have our domain divided in 3 folders
(data, logic, view), and if we do not make this divition eatch domain is
closed in it's own folder, and in the same name folders and files, we can express
what can be called from others modules, or the adapter~orchestator.
Maybe the backtrack is that the module commons, is more coupled to all the modules,
but in the seldom case, we can export out module, we make wit all the common
module, and even in each module put a readme to define how to use the module
in other modules, and how to include it in the adapter~orchestator.

<!--
================================================================================
================================================================================
================================================================================
================================================================================
-->

## Pitfalls

be careful, is better to build the reactive form using formBuilder, because I
couldn't delete a control using the name of the field passed as string.

```ts
class Component {
  private readonly _formBuilder = inject(FormBuilder);
  readonly userForm: FormGroup = this._formBuilder.group({
    username: ['', Validators.required, Validators.min(3), Validators.max(16)],
    ...
  })
  ...
  this.userForm.removeControl('password'); // <-- //Ok
}

//----------------
class Component {
  userFormXX = new FormGroup({ username: new FormControl('', ) ... });
  ...
  this.userForm.removeControl('password'); // <--- Error
}

```
