import { TestBed } from '@angular/core/testing';

import { ClassesResolver } from './classes.resolver';
import { Logger } from 'src/app/shared/services/logger.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ClassesResolver', () => {
  let resolver: ClassesResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports:[HttpClientTestingModule],providers: [Logger] });
    resolver = TestBed.inject(ClassesResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
