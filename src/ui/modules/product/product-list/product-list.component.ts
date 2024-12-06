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

import { IProductService } from '../../../../domain/product/visible/IProductService';
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
  displayedColumns: string[] = ['id', 'name', 'price', 'amount'];
  productsPageReq$ = new Observable<FindProductsPageResponse>();
  tableContent = new MatTableDataSource<ProductResponse>();
  private _destroyedRef = inject(DestroyRef);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(@Inject('ProductService') private _srv: IProductService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this._getPage({ page: 0, size: 5 });
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
    this._getPage({ page: pageEvent.pageIndex, size: pageEvent.pageSize });
  }
}
