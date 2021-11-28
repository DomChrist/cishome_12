import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {SessionTimeTrackingServiceService} from "../../application.service/session-time-tracking-service.service";
import {MeetingSessionTimeAggregate} from "../../domain.model/meeting-session-time-booking";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-time-tracker',
  templateUrl: './time-tracker.component.html',
  styleUrls: ['./time-tracker.component.scss']
})
export class TimeTrackerComponent implements OnInit, OnDestroy {

  @Input()
  public sessionId: string;
  @Input()
  public meetingId: string;

  public description: string;

  public meetingTimeAggregate: MeetingSessionTimeAggregate;
  private subscription: Subscription;

  constructor(private timeTracking: SessionTimeTrackingServiceService) { }

  ngOnInit(): void {
      this.subscription = this.timeTracking.timerActionStream.subscribe( ()=>{
          this.init();
      });
     this.init();
  }

    ngOnDestroy(): void {
      if( this.subscription ) this.subscription.unsubscribe();
    }


    private init(){
        this.timeTracking.loadBySession(this.sessionId , (a)=>{
            this.meetingTimeAggregate = a;
        });
    }

    public book(){
      let stampTimer = this.timeTracking.timeStamp(this.meetingId,this.sessionId);
      this.timeTracking.bookTime( this.description , stampTimer , ()=>{
         this.description = null;
      });
  }




}
