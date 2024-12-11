import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductAddRequest } from '../io/ProductAddRequest';
import { Observable } from 'rxjs';
import { ProductResponse } from '../../../../domain/product/visible/io/ProductResponse';
import { Router } from '@angular/router';

@Component({
  selector: 'product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit {
  @Input()
  type!: string;

  @Input()
  actionReq: Observable<ProductResponse> | undefined;

  @Output()
  onSubmitForm = new EventEmitter<ProductAddRequest>();

  productForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    amount: new FormControl('', [Validators.required]),
  });

  btnSubmitLabel: string = 'add';

  private _images?: FileList;

  private _router = inject(Router);

  ngOnInit(): void {
    console.debug('form product type', this.type);
    switch (this.type) {
      case 'add':
        break;

      case 'details':
        this._setDetailsForm();
        break;

      case 'update':
        this.btnSubmitLabel = 'update';
        this.actionReq?.subscribe((pFound) => {
          this._fillForm(pFound);
        });
        break;

      default:
        break;
    }
  }

  private _setDetailsForm() {
    this.btnSubmitLabel = 'back';
    this.productForm.disable();
    this.actionReq?.subscribe((pFound) => {
      this._fillForm(pFound);
    });
  }

  private _fillForm(pFound: ProductResponse) {
    this.productForm.setValue({
      name: pFound.name,
      price: pFound.price + '',
      amount: pFound.amount + '',
    });
  }

  onSubmit() {
    const pOnForm = this._formToProductAddRequest();
    this.onSubmitForm.emit(pOnForm);
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

  onBack() {
    this._router.navigateByUrl('products');
  }
}
