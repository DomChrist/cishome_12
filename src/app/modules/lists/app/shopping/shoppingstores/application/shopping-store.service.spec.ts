import { TestBed } from '@angular/core/testing';

import { ShoppingStoreService } from './shopping-store.service';

describe('ShoppingStoreService', () => {
  let service: ShoppingStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShoppingStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
