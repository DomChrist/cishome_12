import { TestBed } from '@angular/core/testing';

import { MeetingTodoCommandService } from './meeting-todo-command.service';

describe('MeetingTodoCommandService', () => {
  let service: MeetingTodoCommandService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MeetingTodoCommandService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
