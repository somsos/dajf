import {
  ApplicationConfig,
  provideZoneChangeDetection,
  isDevMode,
  ErrorHandler,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideStore, ActionReducer, MetaReducer } from '@ngrx/store';
import { provideAnimations } from '@angular/platform-browser/animations';
import { authReducer } from '../../state/auth/auth.reducer';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';
import { provideEffects } from '@ngrx/effects';
import { AuthEffects } from '../../state/auth/auth.effects';
import { domainDeps } from './app.domainDeps';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { msgReducer } from '../../state/userMessages/msgs.reducer';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { tokenInterceptor } from './interceptors/tokenInterceptor';
import { localStorageSync } from 'ngrx-store-localstorage';
import { errorInterceptor } from './interceptors/errorInterseptor';
import { loadingsReducer } from '../../state/loading/loading.reducer';
import { loadingRequestInterceptor } from './interceptors/loadingRequestInterceptor';
import { usersReducer } from '../../state/users/users.reducer';
import { GlobalErrorHandler } from '../commons/GlobalErrorHandler';
import { requestReducer } from '../../state/requests/request.conf.exports';

export function localStorageSyncReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return localStorageSync({ keys: ['auth'], rehydrate: true })(reducer);
}

export const metaReducers: Array<MetaReducer<any, any>> = [
  localStorageSyncReducer,
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideStore(
      {
        users: usersReducer,
        router: routerReducer,
        auth: authReducer,
        msgs: msgReducer,
        loadings: loadingsReducer,
        requests: requestReducer,
      },
      {
        metaReducers: metaReducers,
      }
    ),
    provideRouterStore(),
    provideEffects(AuthEffects),
    provideStoreDevtools({
      maxAge: 25, // Retains last 25 states
      logOnly: !isDevMode(), // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: true, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
      connectInZone: true, // If set to true, the connection is established within the Angular zone
    }),
    provideAnimations(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    provideHttpClient(
      withFetch(),
      withInterceptors([
        loadingRequestInterceptor,
        tokenInterceptor,
        errorInterceptor,
      ])
    ),
    ...domainDeps,
  ],
};
