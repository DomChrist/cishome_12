import { TestBed } from '@angular/core/testing';

import { MeetingCommandService } from './meeting-command.service';

describe('MeetingCommandService', () => {
  let service: MeetingCommandService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MeetingCommandService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
