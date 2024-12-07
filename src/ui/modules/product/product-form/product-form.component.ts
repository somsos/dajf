import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductAddRequest } from '../io/ProductAddRequest';
import {
  ProductServiceName,
  IProductService,
} from '../../../../domain/product/visible/IProductService';

@Component({
  selector: 'product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent {
  private _images?: FileList;
  productForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    amount: new FormControl('', [Validators.required]),
  });

  constructor(@Inject(ProductServiceName) private _srv: IProductService) {}

  onSubmit() {
    const toSave = this._formToProductAddRequest();
    console.log('toSave', toSave);
    this._srv.save(toSave);
  }

  private _formToProductAddRequest(): ProductAddRequest {
    const name = this.productForm.value.name ?? '';
    const amount = parseInt(this.productForm.value.amount ?? '0');
    const price = parseFloat(this.productForm.value.price ?? '0');
    const product: ProductAddRequest = {
      name: name,
      amount: amount,
      price: price,
      images: this._images,
    };
    return product;
  }

  catchSelectedImages($event: FileList) {
    this._images = $event;
  }
}
