import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public forecasts?: WeatherForecast[];

  constructor(private readonly http: HttpClient) {}
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

  title = 'Fit World';
}

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}
