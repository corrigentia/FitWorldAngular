import { TestBed } from '@angular/core/testing';

import { StudentResolver } from './student.resolver';
import { Logger } from 'src/app/shared/services/logger.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('StudentResolver', () => {
  let resolver: StudentResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Logger],
      imports: [HttpClientTestingModule],
    });
    resolver = TestBed.inject(StudentResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
