import { Component, Inject, OnInit } from '@angular/core';
import { IProductService } from '../../../../domain/product/visible/IProductService';
import { FindProductsPageRequest } from '../../../../domain/product/visible/io/FindProductsPageRequest';
import { Observable } from 'rxjs';
import { FindProductsPageResponse } from '../../../../domain/product/visible/io/FindProductsPageResponse';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent implements OnInit {
  public productsReq$!: Observable<FindProductsPageResponse>;

  constructor(@Inject('ProductService') private _srv: IProductService) {}

  ngOnInit(): void {
    const firstReq: FindProductsPageRequest = { page: 0, size: 5 };
    this.productsReq$ = this._srv.findPage(firstReq);
  }
}
