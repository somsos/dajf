import { Component, Inject, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first, Observable, take } from 'rxjs';
import { ProductResponse } from '../../../../domain/product/visible/io/ProductResponse';
import {
  ProductServiceName,
  IProductService,
} from '../../../../domain/product/visible/IProductService';
import { DialogService } from '../../../commons/DialogService';
import { Store } from '@ngrx/store';
import { showSnackBack } from '../../../../state/userMessages/msgs.actions';
import { IMessage } from '../../../../state/userMessages/dto/UserMessage';
import { ProductAddRequest } from '../io/ProductAddRequest';
import { ObjectUtils } from '../../../../domain/common/ObjectUtils';
import { updateErr1 } from '../product-constants';

@Component({
  selector: 'app-product-form-update',
  templateUrl: './product-form-update.component.html',
  styleUrl: './product-form-update.component.scss',
})
export class ProductFormUpdateComponent implements OnInit {
  private _activatedRoute = inject(ActivatedRoute);
  private _dialogService = inject(DialogService);
  private _store = inject(Store<any>);
  private _router = inject(Router);

  public findByIdReq$?: Observable<ProductResponse>;
  public delReq$?: Observable<ProductResponse>;
  public updateReq$?: Observable<ProductResponse>;
  public delLoading = false;

  private _productId = 0;
  private _oldProduct?: ProductResponse;

  constructor(@Inject(ProductServiceName) private _srv: IProductService) {}

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((params) => {
      this._findProductById(params.get('id'));
    });
  }

  private _findProductById(idParam: string | null) {
    this._productId = parseInt(idParam ?? 'null');
    if (typeof this._productId !== 'number') {
      return;
    }

    console.debug('idParam', idParam);
    this.findByIdReq$ = this._srv.findById(this._productId);
    this.findByIdReq$.pipe(take(1)).subscribe({
      next: (found) => {
        this._oldProduct = found;
      },
    });
  }

  update(newProduct: ProductAddRequest) {
    let diff = this._getProductInfoNew(newProduct);
    if (!diff) {
      this._store.dispatch(showSnackBack(updateErr1));
      return;
    }
    diff.id = this._productId;
    this.updateReq$ = this._srv.update(diff).pipe(first());
    this.updateReq$.subscribe({
      complete: () => {
        this._router.navigateByUrl('products');
      },
    });
  }

  private _getProductInfoNew(newProduct: ProductAddRequest): any | undefined {
    const diff = ObjectUtils.reduceToDiff(this._oldProduct, newProduct);
    ObjectUtils.removeEmptyProps(diff, ['images']);
    if (Object.keys(diff).length == 0) {
      return undefined;
    }
    return diff;
  }

  async deleteById() {
    const confirmMsg = '¿Seguro de que quieres eliminar este producto?';
    const confirm = await this._dialogService.openConfirmDialog(confirmMsg);
    if (confirm == false) {
      return;
    }

    this.delLoading = true;
    this.delReq$ = this._srv.deleteById(this._productId);
    this.delReq$.subscribe({
      complete: () => {
        console.debug('deletion complete');
        this.delLoading = false;
        this._router.navigateByUrl('products');
      },
      error: (error) => {
        this.delLoading = false;
        const msg: IMessage = { message: error.message, actionLabel: 'Ok' };
        this._store.dispatch(showSnackBack(msg));
      },
    });
  }
}
