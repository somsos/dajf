import { createReducer } from '@ngrx/store';

import { IRequestDto } from '../IRequestDto';
import { RequestsActions } from './requests.actions';
import { mutableOn } from 'ngrx-etc';

export const initialState: ReadonlyArray<IRequestDto<unknown>> = [];

export const requestReducer = createReducer(
  initialState,
  mutableOn(RequestsActions.addRequest, (_state, { data }) => {
    //console.log('req to add', data);
    const newReq: IRequestDto<unknown> = {
      id: data.id,
      status: 'loading',
    };
    _state.push(newReq);
  }),
  mutableOn(RequestsActions.putSuccessRequest, (_state, { data }) => {
    //console.log('req set success', data.id);
    const found = _state.findIndex((r) => r.id === data.id);
    if (found == -1) {
      throw 'not found';
    }
    _state[found].status = 'success';
  }),
  mutableOn(RequestsActions.putFailedRequest, (_state, { data }) => {
    //console.log('req set failed', data);
    const found = _state.findIndex((r) => r.id === data.id);
    if (found == -1) {
      throw 'not found';
    }
    _state[found].status = 'failed';
    _state[found].error = data.error;
  })
);
