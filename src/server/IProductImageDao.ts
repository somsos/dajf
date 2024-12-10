import { Observable } from 'rxjs';

export const productImageDaoName = 'ProductImageDao';

export interface IProductImageDao {
  saveImages(idProduct: number, images?: FileList): Observable<number>[];

  saveImageReq(idProduct: number, image?: File): Observable<number>;
}
