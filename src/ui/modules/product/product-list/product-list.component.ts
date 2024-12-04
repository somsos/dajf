import { Component, Inject, OnInit } from '@angular/core';
import { IProductService } from '../../../../domain/product/visible/IProductService';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent implements OnInit {
  constructor(@Inject('ProductService') private _srv: IProductService) {}
  ngOnInit(): void {
    this._srv.getUsers();
  }
}
