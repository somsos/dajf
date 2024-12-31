import { Observable } from 'rxjs';
import { FindProductsPageRequest } from '../domain/product/visible/io/FindProductsPageRequest';
import { FindProductsPageResponse } from '../domain/product/visible/io/FindProductsPageResponse';
import { ProductAddRequest } from '../ui/modules/product/io/ProductAddRequest';
import { ProductResponse } from '../domain/product/visible/io/ProductResponse';
import { environment } from '../environment/environment';

export const productApiName = 'ProductApi';

//these endpoint are used in http interceptors to add the token
export const endpointProducts = environment.host + '/products';
export const endpointProductsPage = endpointProducts + '/page';
export const endpointProductImage = endpointProducts + '/image/{$id}';
export const endpointUploadImage = endpointProducts + '/{$id}/image';

export interface IProductApi {
  uploadImage(id: number, file: File): Observable<number>;
  findPage(req: FindProductsPageRequest): Observable<FindProductsPageResponse>;

  save(reqInfo: ProductAddRequest): Observable<ProductResponse>;

  findById(id: number): Observable<ProductResponse>;

  deleteById(productId: number): Observable<ProductResponse>;

  update(diff: any): Observable<ProductResponse>;

  deleteImageById(idImage: number): Observable<number>;
}
