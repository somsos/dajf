import { Component, DestroyRef, inject, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductAddRequest } from '../io/ProductAddRequest';
import {
  ProductServiceName,
  IProductService,
} from '../../../../domain/product/visible/IProductService';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { showMessage } from '../../../../state/userMessages/msgs.actions';
import { ErrorDto } from '../../../commons/ErrorDto';

@Component({
  selector: 'product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent {
  productForm = new FormGroup({
    name: new FormControl('someProduct1', [Validators.required]),
    price: new FormControl('100', [Validators.required]),
    amount: new FormControl('10', [Validators.required]),
  });
  savingReq: Observable<any> | undefined;

  private _images?: FileList;
  private _destroyedRef = inject(DestroyRef);

  constructor(
    private _store: Store<any>,
    @Inject(ProductServiceName) private _srv: IProductService,
    private _router: Router
  ) {}

  onSubmit() {
    const toSave = this._formToProductAddRequest();
    this.savingReq = this._srv.save(toSave);
    this.savingReq.pipe(takeUntilDestroyed(this._destroyedRef)).subscribe({
      next: () => {
        this._router.navigateByUrl('/products');
      },
      complete: () => {
        this.savingReq = undefined;
        console.log('save image completed');
      },
      error: (err) => {
        const error = ErrorDto.fromAny(err);
        const message = { message: error.message, actionLabel: 'ok' };
        this._store.dispatch(showMessage(message));
        this.savingReq = undefined;
      },
    });
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
