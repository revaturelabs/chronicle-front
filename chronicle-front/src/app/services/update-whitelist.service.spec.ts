import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';



import { UpdateWhitelistService } from './update-whitelist.service';

describe('UpdateWhitelistService', () => {
  let service: UpdateWhitelistService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatSnackBarModule],
    });
    service = TestBed.inject(UpdateWhitelistService);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
