import { delay, first, map, Observable, take } from 'rxjs';
import { FindProductsPageRequest } from '../../domain/product/visible/io/FindProductsPageRequest';
import { FindProductsPageResponse } from '../../domain/product/visible/io/FindProductsPageResponse';
import {
  endpointProductImage,
  endpointProducts,
  endpointProductsPage,
  endpointUploadImage,
  IProductApi,
} from '../IProductApi';
import { HttpClient, HttpParams } from '@angular/common/http';
import { inject } from '@angular/core';
import { ProductResponse } from '../../domain/product/visible/io/ProductResponse';
import { ProductAddRequest } from '../../ui/modules/product/io/ProductAddRequest';
import { environment } from '../../environment/environment';
import { ProductActionResponse } from '../io/ProductActionResponse';

export class ProductApiImpl implements IProductApi {
  private readonly _http = inject(HttpClient);

  findPage(req: FindProductsPageRequest): Observable<FindProductsPageResponse> {
    const params = new HttpParams().set('page', req.page).set('size', req.size);
    const options = { params: params };
    return this._http
      .get<FindProductsPageResponse>(endpointProductsPage, options)
      .pipe(delay(environment.shortDelay));
  }

  save(reqInfo: ProductAddRequest): Observable<ProductResponse> {
    const images = reqInfo.images;
    reqInfo.images = undefined;
    console.log('images', images);
    return this._http.post<ProductResponse>(endpointProducts, reqInfo);
  }

  findById(id: number): Observable<ProductResponse> {
    return this._http
      .get<ProductResponse>(endpointProducts + '/' + id)
      .pipe(delay(environment.shortDelay));
  }

  deleteById(id: number): Observable<ProductResponse> {
    return this._http
      .delete<ProductActionResponse>(endpointProducts + '/' + id)
      .pipe(
        delay(environment.shortDelay),
        map(() => {
          const mapped: ProductResponse = {
            id: id,
            name: '',
            amount: 0,
            images: [],
            price: 0,
          };
          return mapped;
        })
      );
  }

  update(diff: any): Observable<ProductResponse> {
    const url = endpointProducts + '/' + diff.id;
    return this._http
      .put<ProductResponse>(url, diff)
      .pipe(delay(environment.shortDelay));
  }

  deleteImageById(idImage: number): Observable<number> {
    const url = endpointProductImage.replace('{$id}', idImage + ``);
    return this._http.delete<ProductActionResponse>(url).pipe(
      first(),
      map((resp) => resp.id)
    );
  }

  uploadImage(id: number, file: File): Observable<number> {
    const url = endpointUploadImage.replace('{$id}', id + ``);
    const formData = new FormData();
    formData.append('image', file);
    return this._http.post<ProductActionResponse>(url, formData).pipe(
      first(),
      map((resp) => resp.id)
    );
  }
}
