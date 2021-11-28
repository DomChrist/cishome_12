import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionCollaborationComponent } from './session-collaboration.component';

describe('SessionCollaborationComponent', () => {
  let component: SessionCollaborationComponent;
  let fixture: ComponentFixture<SessionCollaborationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SessionCollaborationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionCollaborationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
