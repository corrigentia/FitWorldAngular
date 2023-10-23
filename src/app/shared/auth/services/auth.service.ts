import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router, RouterState, RouterStateSnapshot } from '@angular/router';
import { catchError, Observable, of, tap } from 'rxjs';
import { IStudentSpring } from 'src/app/interfaces/student-spring';
import { Logger } from '../../services/logger.service';
import { MessageService } from '../../services/message.service';
import { AuthResponse } from '../interfaces/auth-response';
import { IUserLogInForm } from '../interfaces/login';
import { UserRegistration } from '../interfaces/user-registration';
import { UserTokenDTO } from '../../session/interfaces/user-token-d-t-o';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly headers = new HttpHeaders().set(
    'Content-Type',
    'application/json'
  );

  private readonly springBootServerUrl = 'http://localhost:8080';

  private readonly endpoint = 'http://localhost:8080';

  private currentUser: IStudentSpring | undefined;

  constructor(
    private readonly logger: Logger,
    private readonly messageService: MessageService,
    private readonly http: HttpClient,
    private readonly router: Router
  ) {
    console.log(this.router.routerState.snapshot);
  }

  private log(message: string) {
    this.messageService.add(`AuthService: ${message}`);
  }

  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  // registerStudent(form: UserRegistration): Observable<AuthResponse> {
  registerStudent(form: UserRegistration): Observable<UserTokenDTO> {
    const url = `${this.endpoint}/register`;

    // return this.http.post<AuthResponse>(url, form).pipe(
    return this.http.post<UserTokenDTO>(
      // environment.apiBaseUrl + '/register',
      url,
      form
    );
    /*
    .pipe(
      tap((authResponse: AuthResponse) => {
        this.logger.log(
          `Registered student ${JSON.stringify(authResponse)} w/ id=${
            authResponse.user.id
          }`
        );
        this.log(`registered student w/ id=${authResponse.user.id}`);
      }),
      catchError(this.handleError<AuthResponse>('registerStudent'))
    );
    */
  }

  getUserProfile(id: number): Observable<IStudentSpring> {
    const url = `${this.endpoint}/api/students/${id}`;

    return this.http.get<IStudentSpring>(url, { headers: this.headers }).pipe(
      tap((student: IStudentSpring) => {
        this.logger.log(`Fetched student ${JSON.stringify(student)}`);

        this.log(`fetched student id=${id}`);
      }),
      catchError(this.handleError<IStudentSpring>(`getUserProfile id=${id}`))
    );
  }

  logInStudent(form: IUserLogInForm): Observable<UserTokenDTO> {
    console.log('in auth.service.logInStudent');

    const url = `${this.endpoint}/signIn`;

    console.log('url', url);
    console.log('environment.apiBaseUrl', environment.apiBaseUrl);
    console.log(
      'environment.apiBaseUrl + /signIn',
      environment.apiBaseUrl + '/signIn'
    );
    console.log('form', form);

    return (
      this.http
        // .post<AuthResponse>(url, form)
        // .post<UserTokenDTO>(environment.apiBaseUrl + '/signIn', form)
        .post<UserTokenDTO>(this.endpoint + '/signIn', form)
      /*
        .subscribe((authResponse: AuthResponse) => {
          console.log('form:', form);
          console.log('authResponse.token: ', authResponse.token);
          console.log('authResponse: ', authResponse);

          localStorage.setItem('access_token', authResponse.token);
          console.log('access_token:', localStorage.getItem('access_token'));
          console.log('authResponse.user:', authResponse.user);
          console.log('authResponse.user.id:', authResponse.user.id);

          this.getUserProfile(authResponse.user.id).subscribe((fetchedUser) => {
            console.log('this.currentUser:', this.currentUser);
            console.log('fetchedUser:', fetchedUser);

            this.currentUser = fetchedUser;
            console.log('this.currentUser:', this.currentUser);

            localStorage.setItem('logged_in_id', String(fetchedUser.id));

            this.router.navigate([
              'students/' + localStorage.getItem('logged_in_id'),
            ]);
          });
        })
        */
    );
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  get isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  doLogOut() {
    const removeToken = localStorage.removeItem('access_token');

    if (removeToken == null) {
      this.router.navigate(['log-in']);
    }
  }
}
