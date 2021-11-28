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
  private dataList;

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
    var d1: Date = new Date();
    var date: Date = new Date(d * 1000);
    if (d1.getDay() == date.getDay() && d1.getMonth() == date.getMonth()) return true;
    return false;
  }


  private load(): void {
    const url: string = 'http://api.openweathermap.org/data/2.5/forecast?q=Boppard,DE&mode=json&appid=632beecb8e724800240f5fce7a48795f&lang=DE&units=metric';

    this.subscription = this.http.get(url).subscribe((data) => {
      this.dataList = data;
    });
  }

  get list() {
    return this.dataList;
  }

}
