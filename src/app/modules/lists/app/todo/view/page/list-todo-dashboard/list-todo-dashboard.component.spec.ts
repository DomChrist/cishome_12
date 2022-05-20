import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTodoDashboardComponent } from './list-todo-dashboard.component';

describe('ListTodoDashboardComponent', () => {
  let component: ListTodoDashboardComponent;
  let fixture: ComponentFixture<ListTodoDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListTodoDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTodoDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
