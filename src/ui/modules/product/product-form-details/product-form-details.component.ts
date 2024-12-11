import { Component, inject, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  IProductService,
  ProductServiceName,
} from '../../../../domain/product/visible/IProductService';
import { ProductResponse } from '../../../../domain/product/visible/io/ProductResponse';
import { Observable, take } from 'rxjs';

@Component({
  selector: 'app-product-form-details',
  templateUrl: './product-form-details.component.html',
  styleUrl: './product-form-details.component.scss',
})
export class ProductFormDetailsComponent implements OnInit {
  findByIdReq$: Observable<ProductResponse> | undefined;
  isLoading = true;

  private _activatedRoute = inject(ActivatedRoute);
  private _router = inject(Router);

  constructor(@Inject(ProductServiceName) private _srv: IProductService) {}

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((params) => {
      this._findProductById(params.get('id'));
    });
  }

  private _findProductById(idParam: string | null) {
    const id = parseInt(idParam ?? 'null');
    if (typeof id !== 'number') {
      return;
    }
    console.log('idParam', idParam);
    this.findByIdReq$ = this._srv.findById(id);
    this.findByIdReq$.pipe(take(1)).subscribe({
      complete: () => {
        this.isLoading = false;
        setTimeout(() => {
          //this.findByIdReq$ = undefined;
        }, 200);
      },
    });
  }

  onBack() {
    this._router.navigateByUrl('products');
  }
}
