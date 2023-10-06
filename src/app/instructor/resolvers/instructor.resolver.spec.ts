import { TestBed } from '@angular/core/testing';

import { InstructorResolver } from './instructor.resolver';
import { Logger } from 'src/app/shared/services/logger.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('InstructorResolver', () => {
  let resolver: InstructorResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [Logger],
    });
    resolver = TestBed.inject(InstructorResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
