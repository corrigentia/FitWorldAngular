import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { instructorOrHigherGuard } from './instructor-or-higher.guard';

describe('instructorOrHigherGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => instructorOrHigherGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
