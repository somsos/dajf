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
}
