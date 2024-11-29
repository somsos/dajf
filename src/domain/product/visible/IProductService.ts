import { Observable } from 'rxjs';
import { ProductModel } from './ProductModel';

import { InjectionToken } from '@angular/core';

export interface IProductService {
  getUsers(): Observable<ProductModel[]>;
}
