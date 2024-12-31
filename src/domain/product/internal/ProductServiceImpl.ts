import { delay, Observable, of, take, throwError } from 'rxjs';
import { IProductService } from '../visible/IProductService';
import { Inject, Injectable } from '@angular/core';
import { IProductApi, productApiName } from '../../../server/IProductApi';
import { FindProductsPageRequest } from '../visible/io/FindProductsPageRequest';
import { FindProductsPageResponse } from '../visible/io/FindProductsPageResponse';
import { ProductAddRequest } from '../../../ui/modules/product/io/ProductAddRequest';
import { ProductResponse } from '../visible/io/ProductResponse';
import { unexpected } from '../../../ui/modules/product/product-constants';

@Injectable({ providedIn: 'root' })
export class ProductServiceImpl implements IProductService {
  constructor(@Inject(productApiName) private _api: IProductApi) {}

  public findPage(
    req: FindProductsPageRequest
  ): Observable<FindProductsPageResponse> {
    return this._api.findPage(req).pipe(take(1));
  }

  public save(reqInfo: ProductAddRequest): Observable<ProductResponse> {
    return this._api.save(reqInfo).pipe(take(1));
  }

  findById(id: number): Observable<ProductResponse> {
    return this._api.findById(id).pipe(take(1));
  }

  deleteById(productId: number): Observable<ProductResponse> {
    return this._api.deleteById(productId).pipe(take(1));
  }

  update(diff: any): Observable<ProductResponse> {
    if (diff.id == undefined || diff.id <= 0) {
      return throwError(() => {
        return unexpected('ProductServiceImpl.update -> diff.id -> required');
      });
    }
    return this._api.update(diff).pipe(take(1));
  }

  deleteImageById(idImage: number): Observable<number> {
    return this._api.deleteImageById(idImage);
  }

  uploadImage(id: number, file: File): Observable<number> {
    return this._api.uploadImage(id, file);
  }
}
