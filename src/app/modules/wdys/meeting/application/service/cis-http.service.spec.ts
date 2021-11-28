import { TestBed } from '@angular/core/testing';

import { CisHttpService } from './cis-http.service';

describe('CisHttpService', () => {
  let service: CisHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CisHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
