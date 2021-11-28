import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSessionTodoComponent } from './view-session-todo.component';

describe('ViewSessionTodoComponent', () => {
  let component: ViewSessionTodoComponent;
  let fixture: ComponentFixture<ViewSessionTodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSessionTodoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSessionTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
