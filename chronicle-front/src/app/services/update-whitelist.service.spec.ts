import { TestBed } from '@angular/core/testing';

import { UpdateWhitelistService } from './update-whitelist.service';

describe('UpdateWhitelistService', () => {
  let service: UpdateWhitelistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateWhitelistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
