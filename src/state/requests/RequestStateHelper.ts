import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { IRequestDto } from './IRequestDto';
import { RequestActionsNames } from './internals/requests.actions';
import { filter, first, Observable } from 'rxjs';
import { selectRequestById } from './internals/requests.selectors';
import { ErrorDto } from '../../ui/commons/ErrorDto';

interface RequestItem {
  id: string;
  type: string;
  caughtInInterceptor: boolean;
}

@Injectable({ providedIn: 'root' })
export class RequestStateHelper {
  private store = inject(Store);
  private _requests: RequestItem[] = [];

  dispatchRequest(
    type: string,
    data?: unknown
  ): Observable<IRequestDto<unknown>> {
    this._addRequest(type);
    const req = { type: type, data: data };
    this.store.dispatch(req);
    return this._getLastRequestOfType(type);
  }

  private _addRequest(type: string): void {
    console.log('adding req');

    const found = this._requests.find((r) => r.type == type);
    if (found) {
      throw 'request pending';
    }

    const id = this._randomString(10);
    const req = { id: id, type: type, caughtInInterceptor: false };
    this._requests.push(req);
    this.store.dispatch({
      type: RequestActionsNames.AddRequest,
      data: { id: req.id },
    });
  }

  _getLastRequestOfType(type: string): Observable<IRequestDto<unknown>> {
    const found = this._requests.find((r) => r.type == type);
    if (!found) {
      throw 'there is no request';
    }
    return this.store
      .select(selectRequestById(found.id))
      .pipe(filter((x) => x != undefined));
  }

  setSuccess(id: string): void {
    this.store.dispatch({
      type: RequestActionsNames.PutSuccessRequest,
      data: { id: id },
    });
    this._markAsFinished(id);
  }

  setFailed(id: string, error: ErrorDto): void {
    const action = {
      type: RequestActionsNames.PutFailedRequest,
      data: { id: id, error: error },
    };
    this.store.dispatch(action);
    this._markAsFinished(id);
  }

  private _markAsFinished(id: string): void {
    const found = this._requests.find((r) => r.id == id);
    if (!found) {
      throw 'Not found XCDEW';
    }
    found.type = found.type + found.id;
  }

  private _randomString(length: number): string {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }

  getLastAndMarkItAsCaught(): string {
    const lastReq = this._requests[this._requests.length - 1];
    if (!lastReq) {
      throw 'there is no last request';
    }
    if (lastReq.caughtInInterceptor === true) {
      throw 'last already caught';
    }
    lastReq.caughtInInterceptor = true;
    return lastReq.id;
  }
}
