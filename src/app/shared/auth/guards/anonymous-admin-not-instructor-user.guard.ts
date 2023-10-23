import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { SessionService } from '../../session/services/session.service';
import { RoleType } from '../../session/enums/role-type';

export const anonymousAdminNotInstructorUserGuard: CanActivateFn = (
  route,
  state
) => {
  const session = inject(SessionService);
  // return session.data === undefined || session.data?.role === RoleType.ADMIN;
  return session.isAnonymous || session.isAdmin;
};
