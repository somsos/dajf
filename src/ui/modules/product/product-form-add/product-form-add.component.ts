import { Component, DestroyRef, inject, Inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  ProductServiceName,
  IProductService,
} from '../../../../domain/product/visible/IProductService';
import { showMessage } from '../../../../state/userMessages/msgs.actions';
import { ErrorDto } from '../../../commons/ErrorDto';
import { ProductAddRequest } from '../io/ProductAddRequest';

@Component({
  selector: 'app-product-form-add',
  templateUrl: './product-form-add.component.html',
  styleUrl: './product-form-add.component.scss',
})
export class ProductFormAddComponent {
  public saveReq: Observable<any> | undefined;

  private _destroyedRef = inject(DestroyRef);

  constructor(
    private _store: Store<any>,
    @Inject(ProductServiceName) private _srv: IProductService,
    private _router: Router
  ) {}

  public onSubmitSave(toSave: ProductAddRequest) {
    this.saveReq = this._srv.save(toSave);
    this.saveReq.pipe(takeUntilDestroyed(this._destroyedRef)).subscribe({
      next: () => {
        this._router.navigateByUrl('/products');
      },
      complete: () => {
        this.saveReq = undefined;
        console.log('save image completed');
      },
      error: (err) => {
        const error = ErrorDto.fromAny(err);
        const message = { message: error.message, actionLabel: 'ok' };
        this._store.dispatch(showMessage(message));
        this.saveReq = undefined;
      },
    });
  }
}
