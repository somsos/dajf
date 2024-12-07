import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductImagesFormComponent } from './product-images-form.component';

describe('ProductImagesFormComponent', () => {
  let component: ProductImagesFormComponent;
  let fixture: ComponentFixture<ProductImagesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductImagesFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductImagesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
