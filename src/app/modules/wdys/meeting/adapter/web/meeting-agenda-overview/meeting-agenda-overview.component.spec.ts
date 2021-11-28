import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingAgendaOverviewComponent } from './meeting-agenda-overview.component';

describe('MeetingAgendaOverviewComponent', () => {
  let component: MeetingAgendaOverviewComponent;
  let fixture: ComponentFixture<MeetingAgendaOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeetingAgendaOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetingAgendaOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
