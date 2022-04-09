import { TestBed } from '@angular/core/testing';

import { WeekplanTeamService } from './weekplan-team.service';

describe('WeekplanTeamService', () => {
  let service: WeekplanTeamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeekplanTeamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
