import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductFormAddComponent } from './product-form-add/product-form-add.component';
import { ProductFormDetailsComponent } from './product-form-details/product-form-details.component';
import { ProductFormUpdateComponent } from './product-form-update/product-form-update.component';

const routes: Routes = [
  { path: '', component: ProductListComponent },
  { path: 'add', component: ProductFormAddComponent },
  { path: 'details/:id', component: ProductFormDetailsComponent },
  { path: 'update/:id', component: ProductFormUpdateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
