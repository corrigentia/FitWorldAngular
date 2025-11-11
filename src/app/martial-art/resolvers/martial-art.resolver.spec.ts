import { TestBed } from '@angular/core/testing';

import { MartialArtResolver } from './martial-art.resolver';
import { Logger } from 'src/app/shared/services/logger.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('MartialArtResolver', () => {
  let resolver: MartialArtResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [Logger, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
    resolver = TestBed.inject(MartialArtResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
