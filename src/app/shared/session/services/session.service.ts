import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { UserTokenDTO } from '../interfaces/user-token-d-t-o';
import { Observable } from 'rxjs';
import { RoleType } from '../enums/role-type';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private _storageKey: string = 'loggedInUser';

  private _data$ = new BehaviorSubject<UserTokenDTO | undefined>(undefined);

  get data$(): Observable<UserTokenDTO | undefined> {
    return this._data$.asObservable();
  }

  get data(): UserTokenDTO | undefined {
    return this._data$.value;
  }

  constructor() {
    const stringifiedStorage = localStorage.getItem(this._storageKey);

    if (stringifiedStorage) {
      this._data$.next(JSON.parse(stringifiedStorage));
    }
  }

  start(user: UserTokenDTO) {
    localStorage.setItem(this._storageKey, JSON.stringify(user));

    this._data$.next(user);
  }

  stop() {
    localStorage.removeItem(this._storageKey);

    this._data$.next(undefined);
  }

  get isAdmin(): boolean {
    return this.data !== undefined && this.data?.role === RoleType.ADMIN;
  }

  get isInstructor(): boolean {
    return this.data !== undefined && this.data.role === RoleType.INSTRUCTOR;
  }

  get isStudent(): boolean {
    return this.data !== undefined && this.data.role === RoleType.USER;
  }

  get isAnonymous(): boolean {
    return this.data === undefined;
  }

  get isLoggedIn(): boolean {
    return this.data !== undefined;
  }
}
