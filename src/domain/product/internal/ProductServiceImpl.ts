import { delay, Observable, of } from 'rxjs';
import { IProductService } from '../visible/IProductService';
import { Inject, Injectable } from '@angular/core';
import { IProductApi, productApiName } from '../../../server/IProductApi';
import { FindProductsPageRequest } from '../visible/io/FindProductsPageRequest';
import { FindProductsPageResponse } from '../visible/io/FindProductsPageResponse';
import { ProductAddRequest } from '../../../ui/modules/product/io/ProductAddRequest';
import { ProductResponse } from '../visible/io/ProductResponse';

@Injectable({ providedIn: 'root' })
export class ProductServiceImpl implements IProductService {
  constructor(@Inject(productApiName) private _api: IProductApi) {}

  public findPage(
    req: FindProductsPageRequest
  ): Observable<FindProductsPageResponse> {
    const findPageReq = this._api.findPage(req);
    return findPageReq;
  }

  public save(reqInfo: ProductAddRequest): Observable<ProductResponse> {
    return this._api.save(reqInfo);
  }

  findById(id: number): Observable<ProductResponse> {
    return this._api.findById(id);
  }
}
