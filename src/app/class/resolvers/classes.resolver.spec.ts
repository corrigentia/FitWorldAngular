import { TestBed } from '@angular/core/testing';

import { ClassesResolver } from './classes.resolver';
import { Logger } from 'src/app/shared/services/logger.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('ClassesResolver', () => {
  let resolver: ClassesResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [], providers: [Logger, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()] });
    resolver = TestBed.inject(ClassesResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
