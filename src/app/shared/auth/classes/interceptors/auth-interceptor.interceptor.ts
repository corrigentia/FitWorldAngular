import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { RouterStateSnapshot } from '@angular/router';
import { SessionService } from 'src/app/shared/session/services/session.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private readonly _session: SessionService,
    private readonly authService: AuthService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    /*
    if (this.authService.isLoggedIn) {
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + this.authService.getToken(),
        },
      });
    }

    return next.handle(request);
    */
    const loggedInUser = this._session.data;

    if (loggedInUser && loggedInUser.token.trim() !== '') {
      const requestClone = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + loggedInUser.token,
        },
      });

      return next.handle(requestClone);
    }

    return next.handle(request);
  }
}
