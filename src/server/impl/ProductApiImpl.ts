import { delay, Observable, take, tap } from 'rxjs';
import { FindProductsPageRequest } from '../../domain/product/visible/io/FindProductsPageRequest';
import { FindProductsPageResponse } from '../../domain/product/visible/io/FindProductsPageResponse';
import {
  endpointProducts,
  endpointProductsPage,
  IProductApi,
} from '../IProductApi';
import { HttpClient, HttpParams } from '@angular/common/http';
import { inject } from '@angular/core';
import { ProductResponse } from '../../domain/product/visible/io/ProductResponse';
import { ProductAddRequest } from '../../ui/modules/product/io/ProductAddRequest';
import { environment } from '../../environment/environment';

export class ProductApiImpl implements IProductApi {
  private readonly _http = inject(HttpClient);

  findPage(req: FindProductsPageRequest): Observable<FindProductsPageResponse> {
    const params = new HttpParams().set('page', req.page).set('size', req.size);
    const options = { params: params };
    return this._http
      .get<FindProductsPageResponse>(endpointProductsPage, options)
      .pipe(take(1), delay(environment.shortDelay));
  }

  save(reqInfo: ProductAddRequest): Observable<ProductResponse> {
    const images = reqInfo.images;
    reqInfo.images = undefined;
    console.log('images', images);
    return this._http.post<ProductResponse>(endpointProducts, reqInfo);
    /*
    .pipe(tap((resp) => {
        resp.id
      }));
    */
  }

  findById(id: number): Observable<ProductResponse> {
    throw new Error('Method not implemented.');
  }

  deleteById(productId: number): Observable<ProductResponse> {
    throw new Error('Method not implemented.');
  }

  update(diff: any): Observable<ProductResponse> {
    throw new Error('Method not implemented.');
  }
}
