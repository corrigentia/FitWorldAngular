import { CanActivateFn } from '@angular/router';
import { SessionService } from '../../session/services/session.service';
import { inject } from '@angular/core';
import { RoleType } from '../../session/enums/role-type';

export const instructorOrHigherGuard: CanActivateFn = (route, state) => {
  const session = inject(SessionService);
  /*
  return (
    session.data !== undefined &&
    (session.data?.role === RoleType.INSTRUCTOR ||
      session.data?.role === RoleType.ADMIN)
  );
  */
  return session.isInstructor || session.isAdmin;
};
