import { Component, Input, OnInit } from '@angular/core';
import { environment } from '../../../../environment/environment';
// TODO: concentrate constants in domain, becase server and ui depends on them.
import { endpointProductImage } from '../../../../server/IProductApi';

@Component({
  selector: 'product-images-list',
  templateUrl: './product-images-list.component.html',
  styleUrl: './product-images-list.component.scss',
})
export class ProductImagesListComponent implements OnInit {
  @Input()
  public ids: Array<number> = [];

  public urls: string[] = [];

  ngOnInit(): void {
    this._generateUrls();
  }

  private _generateUrls(): void {
    this.ids.forEach((ids) => {
      if (environment.mockData) {
        this.urls.push('favicon.ico?id=' + ids);
      } else {
        const url = endpointProductImage.replace('{$id}', ids + '');
        this.urls.push(url);
      }
    });
  }
}
