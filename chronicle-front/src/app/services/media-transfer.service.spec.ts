import { TestBed } from '@angular/core/testing';

import { VideoPageTransferService } from './media-transfer.service';

describe('VideoPageTransferService', () => {
  let service: VideoPageTransferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VideoPageTransferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
