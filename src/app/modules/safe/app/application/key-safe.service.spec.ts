import { TestBed } from '@angular/core/testing';

import { KeySafeService } from './key-safe.service';

describe('KeySafeService', () => {
  let service: KeySafeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KeySafeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
