import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { SessionService } from '../../session/services/session.service';

export const anonymousGuard: CanActivateFn = (route, state) => {
  const session = inject(SessionService);
  // return session.data === undefined;
  return session.isAnonymous;
};
