import { delay, Observable, take } from 'rxjs';
import { FindProductsPageRequest } from '../../domain/product/visible/io/FindProductsPageRequest';
import { FindProductsPageResponse } from '../../domain/product/visible/io/FindProductsPageResponse';
import { IProductApi } from '../IProductApi';
import { HttpClient, HttpParams } from '@angular/common/http';
import { inject } from '@angular/core';
import { environment } from '../../environment/environment';

export class ProductApiImpl implements IProductApi {
  private readonly _http = inject(HttpClient);
  private static readonly epPage = environment.host + '/products/page';

  findPage(req: FindProductsPageRequest): Observable<FindProductsPageResponse> {
    const params = new HttpParams();
    params.set('page', req.page);
    params.set('size', req.size);
    const options = { params: params };
    return this._http
      .get<FindProductsPageResponse>(ProductApiImpl.epPage, options)
      .pipe(take(1), delay(2000));
  }
}
