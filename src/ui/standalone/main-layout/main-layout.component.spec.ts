import { TestBed } from '@angular/core/testing';
import { MainLayoutComponent } from './main-layout.component';

describe('MainLayoutComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainLayoutComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(MainLayoutComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'dajf' title`, () => {
    const fixture = TestBed.createComponent(MainLayoutComponent);
    const app = fixture.componentInstance;
    expect('dajf').toEqual('dajf');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(MainLayoutComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2')?.textContent).toContain('Hello, dajf');
  });
});
