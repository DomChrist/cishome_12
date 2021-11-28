import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingSessionShareComponent } from './meeting-session-share.component';

describe('MeetingSessionShareComponent', () => {
  let component: MeetingSessionShareComponent;
  let fixture: ComponentFixture<MeetingSessionShareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeetingSessionShareComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetingSessionShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
