import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { anonymousAdminNotInstructorUserGuard } from './anonymous-admin-not-instructor-user.guard';

describe('anonymousAdminNotInstructorUserGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => anonymousAdminNotInstructorUserGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
