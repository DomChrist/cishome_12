import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMeetingNoteComponent } from './create-meeting-note.component';

describe('CreateMeetingNoteComponent', () => {
  let component: CreateMeetingNoteComponent;
  let fixture: ComponentFixture<CreateMeetingNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateMeetingNoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMeetingNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
