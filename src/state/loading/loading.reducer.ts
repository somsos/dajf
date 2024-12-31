import { createReducer, on } from '@ngrx/store';
import { clearLoadingItems, setLoadingItem } from './loading.actions';

export interface LoadingsState {
  activeLoadings: string[];
}

export const loadingsInitialState: LoadingsState = {
  activeLoadings: [],
};

export const loadingsReducer = createReducer<LoadingsState>(
  loadingsInitialState,
  on(clearLoadingItems, (state) => loadingsInitialState),
  on(setLoadingItem, (state, data) => {
    const newItems: string[] = [];
    Object.assign(newItems, state.activeLoadings);
    newItems.push(data.id);
    const newState = {
      ...state,
      activeLoadings: newItems,
    };
    return newState;
  })
);
