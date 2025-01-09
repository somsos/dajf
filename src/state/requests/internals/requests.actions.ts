import { createAction, props } from '@ngrx/store';
import { IRequestDto } from '../IRequestDto';

export const RequestActionsNames = {
  AddRequest: '[Request] Started',
  PutSuccessRequest: '[Request] Success',
  PutFailedRequest: '[Request] Failed',
};

const addRequest = createAction(
  RequestActionsNames.AddRequest,
  props<{ data: IRequestDto<unknown> }>()
);

const putSuccessRequest = createAction(
  RequestActionsNames.PutSuccessRequest,
  props<{ data: IRequestDto<unknown> }>()
);

const putFailedRequest = createAction(
  RequestActionsNames.PutFailedRequest,
  props<{ data: IRequestDto<unknown> }>()
);

export const RequestsActions = {
  addRequest,
  putSuccessRequest,
  putFailedRequest,
};
