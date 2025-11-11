import { TestBed } from '@angular/core/testing';

import { InstructorSearchService } from './instructor-search.service';
import { Logger } from 'src/app/shared/services/logger.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('InstructorSearchService', () => {
  let service: InstructorSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [Logger, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
    service = TestBed.inject(InstructorSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
