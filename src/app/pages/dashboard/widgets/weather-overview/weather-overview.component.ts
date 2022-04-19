import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-weather-overview',
  templateUrl: './weather-overview.component.html',
  styleUrls: ['./weather-overview.component.css']
})
export class WeatherOverviewComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  private dataList: Forecast;
  private today: List[];

  public show = false;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.load();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public isToday(d: number): boolean {
    const d1: Date = new Date();
    const date: Date = new Date(d * 1000);
    if ( d1.getDay() === date.getDay() && d1.getMonth() === date.getMonth()){
        return true;
    }
    return false;
  }


  private load(): void {
    const url = 'http://api.openweathermap.org/data/2.5/forecast?q=Boppard,DE&mode=json&appid=632beecb8e724800240f5fce7a48795f&lang=DE&units=metric';
    this.subscription = this.http.get<Forecast>(url).subscribe((data) => {
      this.dataList = data;
      this.today = this.dataList.list.filter( i => this.isToday( i.dt ) );
    });
  }

  get list() {
    return this.dataList;
  }

  get todayForecast(): List[]{
      return this.today;
  }

  get firstTodayForecast(): List{
      if( !this.todayForecast ) return undefined;
      return this.todayForecast[0];
  }

}

export interface Main {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
}

export interface Weather {
    id: number;
    main: string;
    description: string;
    icon: string;
}

export interface Clouds {
    all: number;
}

export interface Wind {
    speed: number;
    deg: number;
    gust: number;
}

export interface Sys {
    pod: string;
}

export interface Rain {
    '3h': number;
}

export interface List {
    dt: number;
    main: Main;
    weather: Weather[];
    clouds: Clouds;
    wind: Wind;
    visibility: number;
    pop: number;
    sys: Sys;
    dt_txt: string;
    rain: Rain;
}

export interface Coord {
    lat: number;
    lon: number;
}

export interface City {
    id: number;
    name: string;
    coord: Coord;
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
}

export interface Forecast {
    cod: string;
    message: number;
    cnt: number;
    list: List[];
    city: City;
}
