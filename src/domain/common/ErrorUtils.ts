export abstract class ErrorUtils {
  static objToString(e: any): string {
    let msg: string | undefined;
    if (e instanceof Error) {
      msg = e.message;
    }

    if (typeof e === 'string') {
      msg = e;
    }

    if (!msg) {
      msg = 'error desconocido';
    }
    return msg;
  }
}
