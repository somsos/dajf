import { Component, Input, OnInit } from '@angular/core';
import { environment } from '../../../../environment/environment';

@Component({
  selector: 'product-images-list',
  templateUrl: './product-images-list.component.html',
  styleUrl: './product-images-list.component.scss',
})
export class ProductImagesListComponent implements OnInit {
  @Input()
  public images: Array<number> = [];

  public urls: string[] = [];

  ngOnInit(): void {
    this._generateUrls();
  }

  private _generateUrls(): void {
    this.images.forEach((imgId) => {
      if (environment.mockData) {
        this.urls.push('favicon.ico?id=' + imgId);
      } else {
        throw new Error('Not implemented');
      }
    });
  }
}
