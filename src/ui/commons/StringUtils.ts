import { ErrorDto } from './ErrorDto';

export class StringUtils {
  private getLastNumberFromString(url: string): number {
    const match = url.match(/\d+$/);
    if (!match) {
      const cause = "it couldn't get id image form url of image";
      throw new ErrorDto('Error inesperado', cause);
    }
    const number = StringUtils.stringToNumberOtThrow(match[0]);
    return number;
  }

  public static stringToNumberOtThrow(toConvert: any): number {
    const canConvert = !isNaN(parseFloat(toConvert)) && isFinite(toConvert);
    if (canConvert == false) {
      const cause = 'string to convert to number is not a number';
      throw new ErrorDto('Error inesperado', cause);
    }
    const number = parseInt(toConvert);
    return number;
  }
}
