import { Observable } from 'rxjs';
import { IProductService } from '../visible/IProductService';
import { Inject, Injectable } from '@angular/core';
import { IProductApi } from '../../../server/IProductApi';
import { FindProductsPageRequest } from '../visible/io/FindProductsPageRequest';
import { FindProductsPageResponse } from '../visible/io/FindProductsPageResponse';

@Injectable({ providedIn: 'root' })
export class ProductServiceImpl implements IProductService {
  constructor(@Inject('ProductApi') private _api: IProductApi) {}

  public findPage(
    req: FindProductsPageRequest
  ): Observable<FindProductsPageResponse> {
    const findPageReq = this._api.findPage(req);
    return findPageReq;
  }
}
