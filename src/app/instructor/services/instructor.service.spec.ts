import { TestBed } from '@angular/core/testing';

import { InstructorService } from './instructor.service';
import { Logger } from 'src/app/shared/services/logger.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('InstructorService', () => {
  let service: InstructorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [Logger],
    });
    service = TestBed.inject(InstructorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
