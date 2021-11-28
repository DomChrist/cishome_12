import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingOverviewComponent } from './meeting-overview.component';

describe('MeetingOverviewComponent', () => {
  let component: MeetingOverviewComponent;
  let fixture: ComponentFixture<MeetingOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeetingOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetingOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
