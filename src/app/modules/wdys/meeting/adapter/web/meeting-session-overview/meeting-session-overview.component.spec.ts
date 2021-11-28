import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingSessionOverviewComponent } from './meeting-session-overview.component';

describe('MeetingSessionOverviewComponent', () => {
  let component: MeetingSessionOverviewComponent;
  let fixture: ComponentFixture<MeetingSessionOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeetingSessionOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetingSessionOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
