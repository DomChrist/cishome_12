import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Fuel, FuelResponse, GasStationsAggregate} from "./fuel-model";

@Component({
  selector: 'app-fuel-overview',
  templateUrl: './fuel-overview.component.html',
  styleUrls: ['./fuel-overview.component.css']
})
export class FuelOverviewComponent implements OnInit {

  public fuelData: Fuel;

  private readonly lat: string;
  private readonly lon: string;

  constructor(private http: HttpClient) {
    this.lat = '50.230714';
    this.lon = '7.589126';
  }

  ngOnInit() {
    this.load();
  }


  private load(): void {
    const url = 'https://creativecommons.tankerkoenig.de/json/list.php?lat=' + this.lat + '&lng=' + this.lon + '&rad=6&type=all&apikey=9555e371-7230-d723-2874-c5d55862eb06';

    this.http.get<FuelResponse>(url).subscribe((res) => {
        const f: Fuel = Fuel.of(res);
        this.fuelData = f;
        localStorage.setItem('fuel', JSON.stringify(f));
    });

  }

}


