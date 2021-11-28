import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionAddNoteDialogComponent } from './session-add-note-dialog.component';

describe('SessionAddNoteDialogComponent', () => {
  let component: SessionAddNoteDialogComponent;
  let fixture: ComponentFixture<SessionAddNoteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SessionAddNoteDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionAddNoteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
