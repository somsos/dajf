import { Component, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'product-images-form',
  templateUrl: './product-images-form.component.html',
  styleUrl: './product-images-form.component.scss',
})
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
