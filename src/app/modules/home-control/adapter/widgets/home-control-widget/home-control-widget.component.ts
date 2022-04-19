import { Component, OnInit } from '@angular/core';
import {DeviceItem, HomeControlService} from '../../../application/home-control.service';
import {Observable} from "rxjs";

@Component({
  selector: 'app-home-control-widget',
  templateUrl: './home-control-widget.component.html',
  styleUrls: ['./home-control-widget.component.css']
})
export class HomeControlWidgetComponent implements OnInit {

  public data: Observable<Array<DeviceItem>> | null = null;
  // public data;

  constructor( public hue: HomeControlService ) {

  }

  ngOnInit(): void {
      this.init();
  }

  private init(){
      this.data = this.hue.hue.lights();
  }

  public switch( d: DeviceItem ){
      this.hue.hue.changeGroupStatus( d , !d.state );
      this.init();
  }

}
