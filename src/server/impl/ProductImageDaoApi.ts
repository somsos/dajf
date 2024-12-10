import { Observable, of, delay } from 'rxjs';
import { IProductImageDao } from '../IProductImageDao';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ProductImageDaoApi implements IProductImageDao {
  // key=productId, value=image-Ids

  public saveImages(
    idProduct: number,
    images?: FileList
  ): Observable<number>[] {
    throw new Error('ni impl');
  }

  public saveImageReq(idProduct: number, image?: File): Observable<number> {
    throw new Error('ni impl');
  }
}
