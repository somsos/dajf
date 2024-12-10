import { Observable } from 'rxjs';
import { FindProductsPageRequest } from '../domain/product/visible/io/FindProductsPageRequest';
import { FindProductsPageResponse } from '../domain/product/visible/io/FindProductsPageResponse';
import { ProductAddRequest } from '../ui/modules/product/io/ProductAddRequest';
import { ProductResponse } from '../domain/product/visible/io/ProductResponse';
import { environment } from '../environment/environment';

export const productApiName = 'ProductApi';

export const endpointProducts = environment.host + '/products';
export const endpointProductsPage = endpointProducts + '/page';

export interface IProductApi {
  findPage(req: FindProductsPageRequest): Observable<FindProductsPageResponse>;

  save(reqInfo: ProductAddRequest): Observable<ProductResponse>;
}
