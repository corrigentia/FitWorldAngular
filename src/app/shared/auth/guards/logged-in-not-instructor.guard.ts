import { CanActivateFn } from '@angular/router';
import { SessionService } from '../../session/services/session.service';
import { inject } from '@angular/core';
import { RoleType } from '../../session/enums/role-type';

export const loggedInNotInstructorGuard: CanActivateFn = (route, state) => {
  const session = inject(SessionService);
  /*
  return (
    session.data !== undefined && session.data?.role !== RoleType.INSTRUCTOR
  );
  */
  return session.isLoggedIn && !session.isInstructor;
};
