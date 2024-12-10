import { Observable, of, delay } from 'rxjs';
import { IProductImageDao } from '../IProductImageDao';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';

@Injectable({ providedIn: 'root' })
export class ProductImageDaoMock implements IProductImageDao {
  // key=productId, value=image-Ids
  private _mockData = new Map<number, Array<number>>();

  public saveImages(
    idProduct: number,
    images?: FileList
  ): Observable<number>[] {
    const requestsToUploadImages: Observable<number>[] = [];
    if (!images) {
      return requestsToUploadImages;
    }

    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      const req = this.saveImageReq(idProduct, image);
      requestsToUploadImages.push(req);
    }
    return requestsToUploadImages;
  }

  public saveImageReq(idProduct: number, image?: File): Observable<number> {
    const idImageSaved = this._saveImage(idProduct);
    return of(idImageSaved).pipe(delay(environment.shortDelay));
  }

  public _saveImage(idProduct: number): number {
    const imageId = Math.ceil(Math.random() * 1000 + 1); // between 1 and 100
    if (!this._mockData.get(idProduct)) {
      this._mockData.set(idProduct, []);
    }
    this._mockData.get(idProduct)?.push(imageId);
    console.debug('image id added', imageId);
    return imageId;
  }
}
