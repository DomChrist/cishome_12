import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSessionNotesComponent } from './show-session-notes.component';

describe('ShowSessionNotesComponent', () => {
  let component: ShowSessionNotesComponent;
  let fixture: ComponentFixture<ShowSessionNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowSessionNotesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowSessionNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
