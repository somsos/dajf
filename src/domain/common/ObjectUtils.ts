import { ProductResponse } from '../product/visible/io/ProductResponse';

export abstract class ObjectUtils {
  static reduceToDiff(oldObj: any, newObj: any): any {
    if (!newObj) {
      return undefined;
    }
    return Object.keys(newObj).reduce((diff, key) => {
      if (oldObj[key] === newObj[key]) return diff;
      return {
        ...diff,
        [key]: newObj[key],
      };
    }, {});
  }

  static removeEmptyProps(obj: any, props: string[]): void {
    for (let i = 0; i < props.length; i++) {
      const prop = props[i];
      if (obj[prop] == undefined || obj[prop].length == 0) {
        delete obj[prop];
      }
    }
    if (Object.keys(obj).length == 0) {
      obj = undefined;
    }
  }

  static overwrite(oldInfo: ProductResponse, newInfo: any) {
    return { ...oldInfo, ...newInfo };
  }
}
