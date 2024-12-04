import { createReducer, on } from '@ngrx/store';
import { clearMessage, showMessage } from './msgs.actions';
import { IMessage } from './dto/UserMessage';

export interface MsgsState {
  snackBar?: IMessage;
}

export const msgsInitialState: MsgsState = {
  //userAuth: new UserModel(1, 'some', [], undefined),
  snackBar: undefined,
};

export const msgReducer = createReducer(
  msgsInitialState,
  on(showMessage, (state, msg) => ({ ...state, snackBar: msg })),
  on(clearMessage, (state) => ({ ...state, snackBar: undefined }))
);
