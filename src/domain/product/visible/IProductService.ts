import { Observable } from 'rxjs';
import { FindProductsPageRequest } from './io/FindProductsPageRequest';
import { FindProductsPageResponse } from './io/FindProductsPageResponse';
import { ProductAddRequest } from '../../../ui/modules/product/io/ProductAddRequest';
import { ProductResponse } from './io/ProductResponse';

export const ProductServiceName = 'ProductService';

export interface IProductService {
  findPage(req: FindProductsPageRequest): Observable<FindProductsPageResponse>;

  save(reqInfo: ProductAddRequest): Observable<ProductResponse>;

  findById(idParam: number): Observable<ProductResponse>;

  deleteById(productId: number): Observable<ProductResponse>;
}
