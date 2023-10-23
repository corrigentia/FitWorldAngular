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
          'Access-Control-Allow-Origin': `http://localhost:8080/api/students/16/photo`,
          'Access-Control-Allow-Credentials': `true`,
        },
        withCredentials: true,
        /* Ensure credentialed requests are not sent to CORS resources with origin wildcards
A cross-origin resource sharing (CORS) request was blocked because it was configured to include credentials and the Access-Control-Allow-Origin response header of the request or the associated preflight request was set to a wildcard *. CORS requests may only include credentials for resources where the Access-Control-Allow-Origin header is not a wildcard.
To fix this issue, ensure that either the request is configured to not include credentials, or change the Access-Control-Allow-Origin header of the resource to not be a wildcard.
Note that if an opaque response is sufficient, the request's mode can be set to no-cors to fetch the resource with CORS disabled; that way CORS headers are not required but credentials are not sent and the response content is inaccessible (opaque). */

        // withCredentials: false,
      });

      return next.handle(requestClone);
    }

    return next.handle(request);
  }
}
