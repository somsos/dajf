import {
  concatMap,
  delay,
  mergeMap,
  Observable,
  of,
  switchMap,
  take,
  tap,
  throwError,
} from 'rxjs';
import { FindProductsPageRequest } from '../../domain/product/visible/io/FindProductsPageRequest';
import { FindProductsPageResponse } from '../../domain/product/visible/io/FindProductsPageResponse';
import { IProductApi } from '../IProductApi';
import { ProductResponse } from '../../domain/product/visible/io/ProductResponse';
import { ProductAddRequest } from '../../ui/modules/product/io/ProductAddRequest';
import { Inject, Injectable } from '@angular/core';
import { IProductImageDao, productImageDaoName } from '../IProductImageDao';
import { environment } from '../../environment/environment';
import { ObjectUtils } from '../../domain/common/ObjectUtils';
import { ErrorDto } from '../../ui/commons/ErrorDto';

@Injectable({ providedIn: 'root' })
export class ProductApiMock implements IProductApi {
  private _mockData: ProductResponse[] = [
    { id: 1, name: 'product 1', amount: 10, price: 10.2, images: [1, 2] },
    { id: 2, name: 'product 2', amount: 20, price: 20.3, images: [] },
    { id: 3, name: 'product 3', amount: 30, price: 30.4, images: [3, 4] },
    { id: 4, name: 'product 4', amount: 40, price: 40.5, images: [] },
    { id: 5, name: 'product 5', amount: 50, price: 50.1, images: [5, 6, 7] },
    { id: 6, name: 'product 6', amount: 60, price: 60.2, images: [8, 9] },
    { id: 7, name: 'product 7', amount: 70, price: 70.3, images: [] },
    { id: 8, name: 'product 8', amount: 80, price: 80.4, images: [10, 11] },
    { id: 9, name: 'product 9', amount: 90, price: 90.5, images: [] },
    {
      id: 10,
      name: 'product 10',
      amount: 10,
      price: 100.1,
      images: [12, 13, 14],
    },
    { id: 11, name: 'product 11', amount: 11, price: 110.2, images: [15, 16] },
    { id: 12, name: 'product 12', amount: 12, price: 120.3, images: [] },
    { id: 13, name: 'product 13', amount: 13, price: 130.4, images: [17, 18] },
    { id: 14, name: 'product 14', amount: 14, price: 140.5, images: [] },
    { id: 15, name: 'product 15', amount: 15, price: 150.1, images: [19, 20] },
    { id: 16, name: 'product 16', amount: 16, price: 160.2, images: [21] },
    { id: 17, name: 'product 17', amount: 17, price: 170.3, images: [] },
    { id: 18, name: 'product 18', amount: 18, price: 180.4, images: [21] },
    { id: 19, name: 'product 19', amount: 19, price: 190.5, images: [22] },
    { id: 20, name: 'product 20', amount: 20, price: 200.2, images: [23] },
  ];

  constructor(@Inject(productImageDaoName) private _imgSrv: IProductImageDao) {}

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
    return of(page).pipe(delay(environment.longDelay));
  }

  save(reqInfo: ProductAddRequest): Observable<ProductResponse> {
    const toSave = reqInfo as any as ProductResponse;
    toSave.id = this._mockData.length + 1;
    const imagesTemp = structuredClone(reqInfo.images);
    reqInfo.images = undefined;
    const reqSaveUser = of(toSave).pipe(
      delay(environment.shortDelay),
      tap(() => {
        this._mockData.push(toSave);
      }),
      concatMap((saved) => {
        return this._imgSrv.saveImages(saved.id, imagesTemp);
      }),
      switchMap((images) => {
        if (!toSave.images) {
          toSave.images = [];
        }
        images.forEach((imageId) => {
          toSave.images.push(imageId);
        });
        return of(toSave);
      })
    );
    return reqSaveUser;
  }

  findById(id: number): Observable<ProductResponse> {
    const found = this._mockData.filter((p) => p.id == id)[0];
    return of(found).pipe(delay(environment.longDelay));
  }

  deleteById(id: number): Observable<ProductResponse> {
    console.debug('product to delete: ' + id);
    return this.findById(id).pipe(
      switchMap((found) => {
        const filtered = this._mockData.filter((p) => p.id !== found.id);
        this._mockData = filtered;
        return of(found).pipe(delay(environment.longDelay));
      })
    );
  }

  update(newInfo: any): Observable<ProductResponse> {
    console.debug('product to update: ', newInfo);
    return this.findById(newInfo.id).pipe(
      switchMap((found) => {
        const oldInfo = this._mockData.filter((p) => p.id == found.id)[0];
        const merged = ObjectUtils.overwrite(oldInfo, newInfo);
        const index = this._mockData.findIndex((p) => p.id == found.id);
        this._mockData[index] = merged;
        return of(found).pipe(delay(environment.longDelay));
      })
    );
  }

  findProductByImageId(
    idImage: number
  ): Observable<ProductResponse | undefined> {
    const product = this._mockData.find((p) => {
      const image = p.images.find((p) => p == idImage);
      return image != undefined;
    });
    return of(product).pipe(delay(1000));
  }

  deleteImageById(idImageToDel: number): Observable<number> {
    console.debug('Image product to delete: ' + idImageToDel);
    return this.findProductByImageId(idImageToDel).pipe(
      mergeMap((productFound) => {
        if (!productFound) {
          const imageNotFound = new ErrorDto('imagen no encontrada', '');
          return throwError(() => imageNotFound);
        }
        productFound.images = productFound.images.filter(
          (imgId) => imgId != idImageToDel
        );
        return of(idImageToDel).pipe(delay(1000));
      })
    );
  }

  uploadImage(id: number, file: File): Observable<number> {
    const idImage = Math.random() * 10000 + 100;
    return of(idImage).pipe(delay(1000));
  }
}
