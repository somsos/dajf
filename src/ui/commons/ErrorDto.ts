export class ErrorDto {
  constructor(
    public message: string,
    public cause: string,
    public messages?: string[]
  ) {}

  static fromServer(err: any): ErrorDto {
    if (!err.message) {
      return new ErrorDto('Error, intente mas tarde o contacte admin', '');
    }

    if (!err.cause) {
      return new ErrorDto(err.message, '');
    }

    if (!err.causes) {
      return new ErrorDto(err.message, err.cause, []);
    }

    return new ErrorDto(err.message, err.cause, err.causes);
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

    return new ErrorDto(msg, cause);
  }
}
