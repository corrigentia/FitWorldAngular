import { TestBed } from '@angular/core/testing';

import { ClassResolver } from './class.resolver';
import { Logger } from 'src/app/shared/services/logger.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ClassResolver', () => {
  let resolver: ClassResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [Logger],
    });
    resolver = TestBed.inject(ClassResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
