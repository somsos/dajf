import { createSelector, createFeatureSelector } from '@ngrx/store';
import { IRequestDto } from '../IRequestDto';

export const selectRequests =
  createFeatureSelector<ReadonlyArray<IRequestDto<unknown>>>('requests');

export const selectRequestById = (id: string) =>
  createSelector(selectRequests, (requests) => {
    return requests.find((req) => req.id === id);
  });
