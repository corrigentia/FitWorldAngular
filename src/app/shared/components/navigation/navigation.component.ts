import { Component, OnInit } from '@angular/core';
import { LinkType, Link } from '../../interfaces/link';
import { SessionService } from '../../session/services/session.service';
import { UserTokenDTO } from '../../session/interfaces/user-token-d-t-o';
import { RoleType } from '../../session/enums/role-type';
import { Username } from '../../../interfaces/username';
import { Router } from '@angular/router';
import { NavigationService } from '../../services/navigation.service';

const anonymousNavType: LinkType[] = [
  { title: 'Register', url: 'register' },
  { title: 'Log In', url: 'log-in' },
];

const anonymousNav: Link[] = [
  { title: 'Register', url: 'register' },
  { title: 'Log In', url: 'log-in' },
];

const userNav: Link[] = [
  // { title: 'Students', url: 'students' },
  { title: 'Instructors', url: 'instructors' },
  { title: 'Martial Arts', url: 'martial-arts' },
  { title: 'Classes', url: 'classes' },
  { title: 'Equipments', url: 'equipments' },
];

const instructorNav: Link[] = [
  { title: 'Students', url: 'students' },
  // { title: 'Instructors', url: 'instructors' },
  { title: 'Martial Arts', url: 'martial-arts' },
  { title: 'Classes', url: 'classes' },
  { title: 'Equipments', url: 'equipments' },
];

const adminNav: Link[] = [
  { title: 'Students', url: 'students' },
  { title: 'Instructors', url: 'instructors' },
  { title: 'Martial Arts', url: 'martial-arts' },
  { title: 'Classes', url: 'classes' },
  { title: 'Equipments', url: 'equipments' },
];

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  // styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit {
  links: Link[] = [];
  isUserConnected = false;
  loggedInUser?: UserTokenDTO = undefined;

  constructor(
    private readonly _session: SessionService,
    private readonly _router: Router,
    private readonly _navigation: NavigationService
  ) {}

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    this._session.data$.subscribe({
      next: (value?: UserTokenDTO): void => {
        this.loggedInUser = value;
        this.isUserConnected = value !== undefined;
        this.links =
          this.loggedInUser === undefined
            ? anonymousNav
            : this.loggedInUser?.role === RoleType.ADMIN
            ? adminNav
            : this.loggedInUser?.role === RoleType.INSTRUCTOR
            ? instructorNav
            : userNav;
      },
    });
  }

  /*
  logOut() {
    this._session.stop();
  }
  */

  viewProfile() {
    // this._router.navigate(['students/' + this._session.data?.id]);
    this._navigation.visitLoggedInUser();
  }
}
