import { SessionService } from './shared/session/services/session.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/auth/services/auth.service';
import { UserTokenDTO } from './shared/session/interfaces/user-token-d-t-o';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  // styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Fit World';

  isUserConnected = false;

  loggedInUser?: UserTokenDTO = undefined;

  // protected loggedInId = Number(localStorage.getItem('logged_in_id'));

  public forecasts?: WeatherForecast[];

  constructor(
    private readonly http: HttpClient,
    protected readonly authService: AuthService,
    private readonly _session: SessionService
  ) {}
  ngOnInit(): void {
    //throw new Error('Method not implemented.');

    this.http.get<WeatherForecast[]>('/weatherforecast').subscribe({
      next: (result) => {
        this.forecasts = result;
      },
      error: (error) => {
        console.info('weather failed');
        console.error(error);
      },
    });

    this._session.data$.subscribe({
      next: (value?: UserTokenDTO): void => {
        this.loggedInUser = value;
        this.isUserConnected = value !== undefined;
      },
    });
  }

  /*
  onClick() {
    this.authService.doLogOut();
  }
  */

  logOut() {
    this._session.stop();
  }
}

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}
