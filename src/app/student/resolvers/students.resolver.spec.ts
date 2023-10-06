import { TestBed } from '@angular/core/testing';

import { StudentsResolver } from './students.resolver';
import { Logger } from 'src/app/shared/services/logger.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('StudentsResolver', () => {
  let resolver: StudentsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Logger],
      imports: [HttpClientTestingModule],
    });
    resolver = TestBed.inject(StudentsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
