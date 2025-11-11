import { TestBed } from '@angular/core/testing';

import { StudentsResolver } from './students.resolver';
import { Logger } from 'src/app/shared/services/logger.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('StudentsResolver', () => {
  let resolver: StudentsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [Logger, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
    resolver = TestBed.inject(StudentsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
