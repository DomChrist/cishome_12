import { TestBed } from '@angular/core/testing';

import { MeetingTodoQueryService } from './meeting-todo-query.service';

describe('MeetingTodoQueryService', () => {
  let service: MeetingTodoQueryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MeetingTodoQueryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
