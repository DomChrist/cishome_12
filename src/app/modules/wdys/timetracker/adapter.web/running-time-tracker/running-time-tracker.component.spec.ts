import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RunningTimeTrackerComponent } from './running-time-tracker.component';

describe('RunningTimeTrackerComponent', () => {
  let component: RunningTimeTrackerComponent;
  let fixture: ComponentFixture<RunningTimeTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RunningTimeTrackerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RunningTimeTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
