import {
  AfterViewInit,
  Component,
  DestroyRef,
  inject,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import {
  IProductService,
  ProductServiceName,
} from '../../../../domain/product/visible/IProductService';
import { FindProductsPageRequest } from '../../../../domain/product/visible/io/FindProductsPageRequest';
import { FindProductsPageResponse } from '../../../../domain/product/visible/io/FindProductsPageResponse';
import { MatTableDataSource } from '@angular/material/table';
import { ProductResponse } from '../../../../domain/product/visible/io/ProductResponse';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'price', 'amount', 'update'];
  productsPageReq$ = new Observable<FindProductsPageResponse>();
  tableContent = new MatTableDataSource<ProductResponse>();
  Arr = Array;

  private _destroyedRef = inject(DestroyRef);
  private _itemsPerPage = 10;
  private currentPage: FindProductsPageRequest = {
    page: 0,
    size: this._itemsPerPage,
  };

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(@Inject(ProductServiceName) private _srv: IProductService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this._getPage(this.currentPage);
  }

  private _getPage(infoReq: FindProductsPageRequest) {
    this.productsPageReq$ = this._srv.findPage(infoReq).pipe(
      takeUntilDestroyed(this._destroyedRef),
      tap((d: FindProductsPageResponse) => {
        this.tableContent.data = d.content;
      })
    );
  }

  handlePaginatorEvent(pageEvent: PageEvent) {
    this.currentPage.page = pageEvent.pageIndex;
    this._getPage(this.currentPage);
  }

  refresh() {
    this._getPage(this.currentPage);
  }

  onSelectPage(pageNumber: any) {
    this.currentPage.page = pageNumber;
    this._getPage(this.currentPage);
  }
}
