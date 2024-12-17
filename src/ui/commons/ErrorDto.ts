import { HttpErrorResponse } from '@angular/common/http';
import { IMessage } from '../../state/userMessages/dto/UserMessage';

export class ErrorDto {
  private static tokenExpired = 'expired';

  constructor(
    public message: string,
    public cause: string,
    public handled: boolean = false,
    public messages?: string[]
  ) {}

  static fromServer(error: any): IMessage {
    let userMsg = 'Error inesperado';
    let lb = 'ok';
    if (error?.error.cause == ErrorDto.tokenExpired) {
      return { message: ErrorDto.tokenExpired, actionLabel: lb };
    }

    if (error instanceof HttpErrorResponse) {
      if (error.status == 403) {
        userMsg = 'Permisos insuficientes, contacte admins';
      }
    }

    if (error.message && typeof error.message == 'string') {
      userMsg = error.message;
    }

    if (!error.cause) {
      console.warn(error.cause);
    }

    return { message: userMsg, actionLabel: lb };
  }

  static fromAny(error: any): ErrorDto {
    console.warn(error);
    let msg = 'unknown error';
    let cause = 'unknown cause';
    if (typeof error == 'string') {
      msg = error;
    }

    if (error.message && typeof error.message == 'string') {
      msg = error.message;
    }

    if (error.cause && typeof error.cause == 'string') {
      cause = error.cause;
    }

    return new ErrorDto(msg, cause, false);
  }

  static isTokenExpiredError(msg: IMessage): boolean {
    if (msg.message == ErrorDto.tokenExpired) {
      return true;
    }
    return false;
  }
}

const userMsg = 'permisos insuficientes';
const cause = 'token required but there is not token saved';
export const tokenDoNotExist = new ErrorDto(userMsg, cause);
