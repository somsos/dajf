import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardStockerComponent } from './dashboard-stocker.component';

describe('DashboardStockerComponent', () => {
  let component: DashboardStockerComponent;
  let fixture: ComponentFixture<DashboardStockerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardStockerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardStockerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
