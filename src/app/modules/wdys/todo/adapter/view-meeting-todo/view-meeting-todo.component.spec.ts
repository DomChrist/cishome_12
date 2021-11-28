import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMeetingTodoComponent } from './view-meeting-todo.component';

describe('ViewMeetingTodoComponent', () => {
  let component: ViewMeetingTodoComponent;
  let fixture: ComponentFixture<ViewMeetingTodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewMeetingTodoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMeetingTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
