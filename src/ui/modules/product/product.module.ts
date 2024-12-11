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
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ProductImagesFormComponent } from './product-images-form/product-images-form.component';
import { SpinnerComponent } from '../../standalone/common/spinner/spinner.component';
import { productApiName } from '../../../server/IProductApi';
import { ProductServiceName } from '../../../domain/product/visible/IProductService';
import { productImageDaoName } from '../../../server/IProductImageDao';
import { ProductImageDaoMock } from '../../../server/mock4testing/ProductImageDaoMock';
import { ProductImageDaoApi } from '../../../server/impl/ProductImageDaoApi';
import { ProductFormAddComponent } from './product-form-add/product-form-add.component';
import { ProductFormDetailsComponent } from './product-form-details/product-form-details.component';
import { ProductFormUpdateComponent } from './product-form-update/product-form-update.component';
import { ProductImagesListComponent } from './product-images-list/product-images-list.component';

const dataSource = environment.mockData ? ProductApiMock : ProductApiImpl;
const dataSourceImages = environment.mockData
  ? ProductImageDaoMock
  : ProductImageDaoApi;

@NgModule({
  declarations: [
    ProductListComponent,
    ProductFormComponent,
    ProductFormAddComponent,
    ProductFormDetailsComponent,
    ProductFormUpdateComponent,
    ProductImagesListComponent,
    ProductImagesFormComponent,
  ],
  imports: [
    SpinnerComponent,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatTableModule,
    ProductRoutingModule,
    CommonModule,
    MatButtonModule,
    RouterModule,
  ],
  providers: [
    { provide: productImageDaoName, useClass: dataSourceImages },
    { provide: productApiName, useClass: dataSource },
    { provide: ProductServiceName, useClass: ProductServiceImpl },
  ],
})
export class productModule {}
