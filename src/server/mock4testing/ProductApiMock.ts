import { delay, Observable, of, take } from 'rxjs';
import { FindProductsPageRequest } from '../../domain/product/visible/io/FindProductsPageRequest';
import { FindProductsPageResponse } from '../../domain/product/visible/io/FindProductsPageResponse';
import { IProductApi } from '../IProductApi';
import { ProductResponse } from '../../domain/product/visible/io/ProductResponse';

export class ProductApiMock implements IProductApi {
  private readonly _mockData: ProductResponse[] = [
    { id: 1, name: 'product 1', amount: 10, price: 10.1, images: [1, 2, 3] },
    { id: 2, name: 'product 2', amount: 20, price: 20.2, images: [4, 5] },
    { id: 3, name: 'product 3', amount: 30, price: 30.3, images: [] },
    { id: 4, name: 'product 4', amount: 40, price: 40.4, images: [6, 7] },
    { id: 5, name: 'product 5', amount: 50, price: 50.5, images: [] },
    { id: 6, name: 'product 6', amount: 60, price: 60.6, images: [8, 9] },
  ];

  findPage(req: FindProductsPageRequest): Observable<FindProductsPageResponse> {
    const startingPoint = req.page * req.size;
    const finishingPoint = startingPoint + req.size;
    const contentPage = this._mockData.slice(startingPoint, finishingPoint);
    const page: FindProductsPageResponse = {
      content: contentPage,
      size: req.size,
      totalElements: this._mockData.length,
      totalPages: this._mockData.length / req.size,
      number: req.page,
    };
    return of(page).pipe(delay(2000));
  }
}
