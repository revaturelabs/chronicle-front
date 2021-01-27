import { TestBed } from '@angular/core/testing';

import { TagColorService } from './tag-color.service';

describe('TagColorService', () => {
  let service: TagColorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TagColorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
