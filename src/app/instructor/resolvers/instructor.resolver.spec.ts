import { TestBed } from '@angular/core/testing';

import { InstructorResolver } from './instructor.resolver';
import { Logger } from 'src/app/shared/services/logger.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('InstructorResolver', () => {
  let resolver: InstructorResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [Logger, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
    resolver = TestBed.inject(InstructorResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
