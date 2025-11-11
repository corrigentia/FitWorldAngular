import { TestBed } from '@angular/core/testing';

import { ClassResolver } from './class.resolver';
import { Logger } from 'src/app/shared/services/logger.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('ClassResolver', () => {
  let resolver: ClassResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [Logger, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
    resolver = TestBed.inject(ClassResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
