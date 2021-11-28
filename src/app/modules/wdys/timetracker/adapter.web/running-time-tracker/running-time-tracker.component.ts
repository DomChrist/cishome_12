import { Component, OnInit } from '@angular/core';
import {
    SessionStampTimer,
    SessionTimeTrackingServiceService
} from "../../application.service/session-time-tracking-service.service";

@Component({
  selector: 'app-running-time-tracker',
  templateUrl: './running-time-tracker.component.html',
  styleUrls: ['./running-time-tracker.component.scss']
})
export class RunningTimeTrackerComponent implements OnInit {

  public tracker: SessionStampTimer;
  public collapsed = false;

  constructor( private timeService: SessionTimeTrackingServiceService) { }

  ngOnInit(): void {
      this.init();
      this.timeService.timerActionStream.subscribe( ()=>{
          this.init();
      });
  }

  private init(){
      this.tracker = this.timeService.current();
  }

  public toggler(event){
    this.collapsed = event['collapsed'];
  }

}
