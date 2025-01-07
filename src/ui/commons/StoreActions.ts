import { Action } from '@ngrx/store';

export interface StoreActions<T> extends Action {
  data: T;
}
