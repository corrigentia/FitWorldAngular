import { TestBed } from '@angular/core/testing';

import { InstructorSearchService } from './instructor-search.service';
import { Logger } from 'src/app/shared/services/logger.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('InstructorSearchService', () => {
  let service: InstructorSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [Logger],
    });
    service = TestBed.inject(InstructorSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
