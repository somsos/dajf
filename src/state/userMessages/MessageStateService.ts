import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { IMessage } from './dto/UserMessage';
import { showSnackBack } from './msgs.actions';

@Injectable({ providedIn: 'root' })
export class NotificationStateManager {
  private readonly _store = inject(Store);

  public showSnackBar(msg: IMessage) {
    this._store.dispatch(showSnackBack(msg));
  }
}
