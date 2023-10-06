import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Fit World';

  protected loggedInId = Number(localStorage.getItem('logged_in_id'));

  public forecasts?: WeatherForecast[];

  constructor(
    private readonly http: HttpClient,
    protected readonly authService: AuthService
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
  }

  onClick() {
    this.authService.doLogOut();
  }
}

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}
