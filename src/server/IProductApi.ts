import { Observable } from 'rxjs';
import { FindProductsPageRequest } from '../domain/product/visible/io/FindProductsPageRequest';
import { FindProductsPageResponse } from '../domain/product/visible/io/FindProductsPageResponse';

const IProductApiName = 'ProductApi';

export interface IProductApi {
  findPage(req: FindProductsPageRequest): Observable<FindProductsPageResponse>;
}
