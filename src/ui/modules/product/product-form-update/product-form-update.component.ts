import { Component, Inject, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, take } from 'rxjs';
import { ProductResponse } from '../../../../domain/product/visible/io/ProductResponse';
import {
  ProductServiceName,
  IProductService,
} from '../../../../domain/product/visible/IProductService';
import { DialogService } from '../../../commons/DialogService';
import { Store } from '@ngrx/store';
import { showSnackBack } from '../../../../state/userMessages/msgs.actions';
import { IMessage } from '../../../../state/userMessages/dto/UserMessage';

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

  private productId = 0;

  public findByIdReq$?: Observable<ProductResponse>;
  public delReq$?: Observable<ProductResponse>;
  public delLoading = false;

  constructor(@Inject(ProductServiceName) private _srv: IProductService) {}

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((params) => {
      this._findProductById(params.get('id'));
    });
  }

  private _findProductById(idParam: string | null) {
    this.productId = parseInt(idParam ?? 'null');
    if (typeof this.productId !== 'number') {
      return;
    }

    console.debug('idParam', idParam);
    this.findByIdReq$ = this._srv.findById(this.productId);
    this.findByIdReq$.pipe(take(1)).subscribe({
      complete: () => {
        setTimeout(() => {
          //this.findByIdReq$ = undefined;
        }, 200);
      },
    });
  }

  async deleteById() {
    const confirmMsg = '¿Seguro de que quieres eliminar este producto?';
    const confirm = await this._dialogService.openConfirmDialog(confirmMsg);
    if (confirm == false) {
      return;
    }

    this.delLoading = true;
    this.delReq$ = this._srv.deleteById(this.productId);
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
