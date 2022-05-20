import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoWeekLineComponent } from './todo-week-line.component';

describe('TodoWeekLineComponent', () => {
  let component: TodoWeekLineComponent;
  let fixture: ComponentFixture<TodoWeekLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoWeekLineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoWeekLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
