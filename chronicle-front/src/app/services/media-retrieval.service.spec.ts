import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from 'src/environments/environment';

import { MediaRetrievalService } from './media-retrieval.service';

describe('MediaRetrievalService', () => {
  let service: MediaRetrievalService;

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [
            RouterTestingModule,
            HttpClientModule,
            AngularFireModule.initializeApp(environment.firebaseConfig)
        ],
    });
    service = TestBed.inject(MediaRetrievalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
