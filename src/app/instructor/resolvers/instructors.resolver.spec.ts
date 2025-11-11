import { TestBed } from '@angular/core/testing';

import { InstructorsResolver } from './instructors.resolver';
import { Logger } from 'src/app/shared/services/logger.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('InstructorsResolver', () => {
  let resolver: InstructorsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [Logger, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
    resolver = TestBed.inject(InstructorsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
