import {
  Component,
  EventEmitter,
  inject,
  Inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { environment } from '../../../../environment/environment';
// TODO: concentrate constants in domain, becase server and ui depends on them.
import { endpointProductImage } from '../../../../server/IProductApi';
import { ErrorDto } from '../../../commons/ErrorDto';
import { Observable } from 'rxjs';
import {
  ProductServiceName,
  IProductService,
} from '../../../../domain/product/visible/IProductService';
import { ActivatedRoute } from '@angular/router';
import { StringUtils } from '../../../commons/StringUtils';

@Component({
  selector: 'product-images-list',
  templateUrl: './product-images-list.component.html',
  styleUrl: './product-images-list.component.scss',
})
export class ProductImagesListComponent {
  @Input()
  public ids: Array<number> = [];

  @Input()
  public isAddForm: boolean = false;

  public deletingId: number | undefined;

  public uploadingImage = false;

  constructor(
    private _route: ActivatedRoute,
    @Inject(ProductServiceName) private _srv: IProductService
  ) {}

  public generateUrl(idImage: number): string {
    let urlImage = '';
    if (environment.mockData) {
      urlImage = 'r/1.png?id=' + idImage;
    } else {
      urlImage = endpointProductImage.replace('{$id}', idImage + '');
    }
    return urlImage;
  }

  deleteImageById(event: any, idImage: number) {
    event.preventDefault();
    this.deletingId = idImage;
    this._srv.deleteImageById(idImage).subscribe({
      complete: () => {
        if (this.deletingId == undefined) {
          throw new ErrorDto('Error inesperado', 'expected this.deletingId');
        }
        this.ids = this.ids.filter((i) => i !== this.deletingId);
        this.deletingId = undefined;
      },
      error: () => {
        this.deletingId = undefined;
      },
    });
  }

  addImage(event: any) {
    const idStr = this._route.snapshot.paramMap.get('id');
    const id = StringUtils.stringToNumberOtThrow(idStr);
    const file = event.target.files[0] as File;
    const uploadReq = this._srv.uploadImage(id, file);
    this.uploadingImage = true;
    uploadReq.subscribe({
      next: (idImage) => {
        console.log('imageUploaded', idImage);
        this.ids.unshift(idImage);
      },
      complete: () => {
        this.uploadingImage = false;
      },
      error: () => {
        this.uploadingImage = false;
      },
    });
  }
}

/**
//With previews
export class ProductImagesFormComponent {
  selectedFiles?: FileList;
  message: string[] = [];

  previews: string[] = [];
  imageInfos?: Observable<any>;

  @Output()
  onSelectedImages = new EventEmitter<FileList>();

  selectFiles(event: any): void {
    this.message = [];
    this.selectedFiles = event.target.files;

    this.previews = [];
    if (this.selectedFiles && this.selectedFiles[0]) {
      const numberOfFiles = this.selectedFiles.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.previews.push(e.target.result);
        };
        reader.readAsDataURL(this.selectedFiles[i]);
      }
      this.onSelectedImages.emit(this.selectedFiles);
    }
  }
}

 *
 */
