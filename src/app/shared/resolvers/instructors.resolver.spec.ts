import { TestBed } from '@angular/core/testing';

import { InstructorsResolver } from './instructors.resolver';

describe('InstructorsResolver', () => {
  let resolver: InstructorsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(InstructorsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
