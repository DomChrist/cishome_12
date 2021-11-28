import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeTrackerButtonComponent } from './time-tracker-button.component';

describe('TimeTrackerButtonComponent', () => {
  let component: TimeTrackerButtonComponent;
  let fixture: ComponentFixture<TimeTrackerButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeTrackerButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeTrackerButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
