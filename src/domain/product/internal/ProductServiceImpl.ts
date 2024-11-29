import { Observable, of } from 'rxjs';
import { IProductService } from '../visible/IProductService';
import { ProductModel } from '../visible/ProductModel';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ProductServiceImpl implements IProductService {
  public getUsers(): Observable<ProductModel[]> {
    console.log('getting ');
    return of([]);
  }
}
