import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockerDashboardComponent } from './stocker-dashboard.component';

describe('StockerDashboardComponent', () => {
  let component: StockerDashboardComponent;
  let fixture: ComponentFixture<StockerDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockerDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockerDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
