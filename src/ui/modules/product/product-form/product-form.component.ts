import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductAddRequest } from '../io/ProductAddRequest';
import { filter, Observable, take } from 'rxjs';
import { ProductResponse } from '../../../../domain/product/visible/io/ProductResponse';

@Component({
  selector: 'product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit {
  @Input()
  type!: string;

  @Input()
  actionReq$: Observable<ProductResponse> | undefined;

  @Input()
  readReq$: Observable<ProductResponse> | undefined;

  productFound?: ProductResponse;

  @Output()
  readonly onSubmitForm = new EventEmitter<ProductAddRequest>();

  @Output()
  readonly onProductFoundOut = new EventEmitter<ProductResponse>();

  productForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    amount: new FormControl('', [Validators.required]),
  });

  btnSubmitLabel: string = 'add';

  private _images?: FileList;

  ngOnInit(): void {
    this._setupForm();
  }

  private _setupForm() {
    console.debug('form product type', this.type);
    switch (this.type) {
      case 'add':
        this._setAddForm();
        break;

      case 'details':
        this._setDetailsForm();
        break;

      case 'update':
        this._setUpdateForm();
        break;

      default:
        break;
    }
  }

  private _setAddForm() {
    if (!this.readReq$) {
      const productMock: ProductResponse = {
        id: 0,
        amount: 0,
        images: [],
        name: '',
        price: 0,
      };
      this.productFound = productMock;
    }
  }

  private _setDetailsForm() {
    this.productForm.disable();
    this._watchReadProduct();
  }

  private _setUpdateForm() {
    this._watchReadProduct();
    this.btnSubmitLabel = 'Actualizar';
  }

  private _watchReadProduct() {
    this.readReq$
      ?.pipe(
        take(1),
        filter((p) => p != undefined)
      )
      .subscribe((pFound) => {
        this.productFound = pFound;
        this.onProductFoundOut.emit(pFound);
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
}
