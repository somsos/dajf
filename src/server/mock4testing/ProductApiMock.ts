import { delay, Observable, of, take } from 'rxjs';
import { FindProductsPageRequest } from '../../domain/product/visible/io/FindProductsPageRequest';
import { FindProductsPageResponse } from '../../domain/product/visible/io/FindProductsPageResponse';
import { IProductApi } from '../IProductApi';
import { ProductResponse } from '../../domain/product/visible/io/ProductResponse';

export class ProductApiMock implements IProductApi {
  private readonly _mockData: ProductResponse[] = [
    { id: 1, name: 'product 1', amount: 10, price: 10.2, images: [4, 5] },
    { id: 2, name: 'product 2', amount: 20, price: 20.3, images: [] },
    { id: 3, name: 'product 3', amount: 30, price: 30.4, images: [6, 7] },
    { id: 4, name: 'product 4', amount: 40, price: 40.5, images: [] },
    { id: 5, name: 'product 5', amount: 50, price: 50.1, images: [1, 2, 3] },
    { id: 6, name: 'product 6', amount: 60, price: 60.2, images: [4, 5] },
    { id: 7, name: 'product 7', amount: 70, price: 70.3, images: [] },
    { id: 8, name: 'product 8', amount: 80, price: 80.4, images: [6, 7] },
    { id: 9, name: 'product 9', amount: 90, price: 90.5, images: [] },
    { id: 10, name: 'product 10', amount: 10, price: 100.1, images: [1, 2, 3] },
    { id: 11, name: 'product 11', amount: 11, price: 110.2, images: [4, 5] },
    { id: 12, name: 'product 12', amount: 12, price: 120.3, images: [] },
    { id: 13, name: 'product 13', amount: 13, price: 130.4, images: [6, 7] },
    { id: 14, name: 'product 14', amount: 14, price: 140.5, images: [] },
    { id: 15, name: 'product 15', amount: 15, price: 150.1, images: [1, 2, 3] },
    { id: 16, name: 'product 16', amount: 16, price: 160.2, images: [4, 5] },
    { id: 17, name: 'product 17', amount: 17, price: 170.3, images: [] },
    { id: 18, name: 'product 18', amount: 18, price: 180.4, images: [6, 7] },
    { id: 19, name: 'product 19', amount: 19, price: 190.5, images: [] },
  ];

  findPage(req: FindProductsPageRequest): Observable<FindProductsPageResponse> {
    const startingPoint = req.page * req.size;
    const finishingPoint = startingPoint + req.size;
    const contentPage = this._mockData.slice(startingPoint, finishingPoint);
    const page: FindProductsPageResponse = {
      content: contentPage,
      size: req.size,
      totalElements: this._mockData.length,
      totalPages: Math.ceil(this._mockData.length / req.size),
      number: req.page,
    };
    return of(page).pipe(delay(2000));
  }
}
