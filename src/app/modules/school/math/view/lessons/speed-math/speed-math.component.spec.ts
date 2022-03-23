import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeedMathComponent } from './speed-math.component';

describe('SpeedMathComponent', () => {
  let component: SpeedMathComponent;
  let fixture: ComponentFixture<SpeedMathComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeedMathComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeedMathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
