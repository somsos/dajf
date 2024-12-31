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

  static fromServer(error: HttpErrorResponse): IMessage {
    let lb = 'ok';

    const errorServer = ErrorDto.anyToErrorResponseOrThrow(error.error);

    if (error.status == 403) {
      const userMsg = 'Permisos insuficientes, contacte admins';
      return { message: userMsg, actionLabel: lb };
    }

    return { message: errorServer.message, actionLabel: lb };
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

  static anyToErrorResponseOrThrow(error: any): ErrorDto {
    const cause = error.cause;
    const message = error.message;
    if (cause == undefined || typeof cause !== 'string') {
      const cause =
        "server error response couldn't be converted to ErrorDto, cause lost";
      throw new ErrorDto('Error inesperado', cause);
    }

    if (message == undefined || typeof message !== 'string') {
      const cause =
        "server error response couldn't be converted to ErrorDto, message lost";
      throw new ErrorDto('Error inesperado', cause);
    }

    return new ErrorDto(message, cause);
  }
}

const userMsg = 'permisos insuficientes';
const cause = 'token required but there is not token saved';
export const tokenDoNotExist = new ErrorDto(userMsg, cause);
