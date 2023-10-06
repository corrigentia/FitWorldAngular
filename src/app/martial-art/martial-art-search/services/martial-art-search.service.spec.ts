import { TestBed } from '@angular/core/testing';

import { MartialArtSearchService } from './martial-art-search.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MartialArtSearchService', () => {
  let service: MartialArtSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(MartialArtSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
