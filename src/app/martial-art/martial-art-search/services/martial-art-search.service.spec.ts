import { TestBed } from '@angular/core/testing';

import { MartialArtSearchService } from './martial-art-search.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('MartialArtSearchService', () => {
  let service: MartialArtSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [], providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()] });
    service = TestBed.inject(MartialArtSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
