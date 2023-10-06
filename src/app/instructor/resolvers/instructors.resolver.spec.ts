import { TestBed } from '@angular/core/testing';

import { InstructorsResolver } from './instructors.resolver';
import { Logger } from 'src/app/shared/services/logger.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('InstructorsResolver', () => {
  let resolver: InstructorsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Logger],
      imports: [HttpClientTestingModule],
    });
    resolver = TestBed.inject(InstructorsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
