import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarDialogComponent } from './car-detail.component';

describe('CarDetailComponent', () => {
  let component: CarDialogComponent;
  let fixture: ComponentFixture<CarDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});