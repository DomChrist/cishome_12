import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewTodoDialogComponent } from './create-new-todo-dialog.component';

describe('CreateNewTodoDialogComponent', () => {
  let component: CreateNewTodoDialogComponent;
  let fixture: ComponentFixture<CreateNewTodoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateNewTodoDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewTodoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
