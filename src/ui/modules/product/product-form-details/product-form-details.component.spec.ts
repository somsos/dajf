import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductFormDetailsComponent } from './product-form-details.component';

describe('ProductFormDetailsComponent', () => {
  let component: ProductFormDetailsComponent;
  let fixture: ComponentFixture<ProductFormDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductFormDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductFormDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
