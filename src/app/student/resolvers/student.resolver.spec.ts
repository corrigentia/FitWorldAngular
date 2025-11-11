import { TestBed } from '@angular/core/testing';

import { StudentResolver } from './student.resolver';
import { Logger } from 'src/app/shared/services/logger.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('StudentResolver', () => {
  let resolver: StudentResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [Logger, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
    resolver = TestBed.inject(StudentResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
