import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductRoutingModule } from './product-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductServiceImpl } from '../../../domain/product/internal/ProductServiceImpl';
import { ProductApiImpl } from '../../../server/impl/ProductApiImpl';
import { ProductApiMock } from '../../../server/mock4testing/ProductApiMock';
import { environment } from '../../../environment/environment';
import { MatPaginatorModule } from '@angular/material/paginator';

const dataSource = environment.mockData ? ProductApiMock : ProductApiImpl;

@NgModule({
  declarations: [ProductListComponent, ProductFormComponent],
  imports: [
    MatPaginatorModule,
    MatTableModule,
    ProductRoutingModule,
    CommonModule,
    MatButtonModule,
    RouterModule,
  ],
  providers: [
    { provide: 'ProductApi', useClass: dataSource },
    { provide: 'ProductService', useClass: ProductServiceImpl },
  ],
})
export class productModule {}
