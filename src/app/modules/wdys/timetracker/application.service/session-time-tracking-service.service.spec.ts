import { TestBed } from '@angular/core/testing';

import { SessionTimeTrackingServiceService } from './session-time-tracking-service.service';

describe('SessionTimeTrackingServiceService', () => {
  let service: SessionTimeTrackingServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionTimeTrackingServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
