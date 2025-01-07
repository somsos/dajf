import { ErrorHandler, inject, Injectable } from '@angular/core';
import { ErrorDto } from './ErrorDto';
import { NotificationService } from './NotificationService';

@Injectable({
  providedIn: 'root',
})
export class GlobalErrorHandler implements ErrorHandler {
  private readonly _notiSrv = inject(NotificationService);

  handleError(error: any): void {
    const handled = this.handleErrorDto(error);
    if (handled) {
      return;
    }

    this._notiSrv.showSnackBar('Error inesperado', 'Ok');
    console.warn('error unhandled:', error);
  }

  handleErrorDto(error: any): boolean {
    if (error instanceof ErrorDto == false) {
      return false;
    }
    this._notiSrv.showSnackBar(error.message, 'Ok');
    return true;
  }
}
