import { Observable } from 'rxjs';
import { FindProductsPageRequest } from './io/FindProductsPageRequest';
import { FindProductsPageResponse } from './io/FindProductsPageResponse';

export interface IProductService {
  findPage(req: FindProductsPageRequest): Observable<FindProductsPageResponse>;
}
