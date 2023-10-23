import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { SessionService } from '../session/services/session.service';
import { RoleType } from '../session/enums/role-type';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  constructor(
    private readonly _router: Router,
    private readonly _session: SessionService
  ) {}

  visitLoggedInUser() {
    console.log('trying to visit user profile');
    console.log(this._session.data?.email);

    if (this._session.data) {
      console.log(this._session.data.role);
      this._router.navigate([
        // had to include in parens the whole conditional string before concat + id
        (this._session.data?.role === RoleType.USER
          ? 'students/'
          : `${this._session.data?.role.toLocaleLowerCase()}s/`) +
          this._session.data?.id,
      ]);
    }
  }
}
