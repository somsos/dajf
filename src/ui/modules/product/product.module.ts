import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductRoutingModule } from './product-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { ProductFormComponent } from './product-form/product-form.component';

@NgModule({
  declarations: [ProductListComponent, ProductFormComponent],
  imports: [ProductRoutingModule, CommonModule, MatButtonModule, RouterModule],
})
export class productModule {}
