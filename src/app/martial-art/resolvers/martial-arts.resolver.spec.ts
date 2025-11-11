import { TestBed } from '@angular/core/testing';

import { MartialArtsResolver } from './martial-arts.resolver';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Logger } from 'src/app/shared/services/logger.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('MartialArtsResolver', () => {
  let resolver: MartialArtsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [Logger, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
    resolver = TestBed.inject(MartialArtsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
