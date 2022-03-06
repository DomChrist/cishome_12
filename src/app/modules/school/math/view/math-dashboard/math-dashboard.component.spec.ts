import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MathDashboardComponent } from './math-dashboard.component';

describe('MathDashboardComponent', () => {
  let component: MathDashboardComponent;
  let fixture: ComponentFixture<MathDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MathDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MathDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
