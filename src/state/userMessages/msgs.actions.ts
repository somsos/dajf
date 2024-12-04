import { createAction, props } from '@ngrx/store';
import { IMessage } from './dto/UserMessage';

export const MsgsActionsNames = {
  ShowMsg: '[Msgs] Show message',
  ClearMsg: '[Msgs] Hide Message',
};

export const showMessage = createAction(
  MsgsActionsNames.ShowMsg,
  props<IMessage>()
);

export const clearMessage = createAction(MsgsActionsNames.ClearMsg);
