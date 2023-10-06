import { TestBed } from '@angular/core/testing';

import { MartialArtResolver } from './martial-art.resolver';
import { Logger } from 'src/app/shared/services/logger.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MartialArtResolver', () => {
  let resolver: MartialArtResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [Logger],
    });
    resolver = TestBed.inject(MartialArtResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
