import {Component, Input, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {start} from "repl";
import {
    SessionStampTimer,
    SessionTimeTrackingServiceService
} from "../../application.service/session-time-tracking-service.service";
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-time-tracker-button',
  templateUrl: './time-tracker-button.component.html',
  styleUrls: ['./time-tracker-button.component.scss']
})
export class TimeTrackerButtonComponent implements OnInit, OnDestroy {

  @Input()
  public sessionId: string;
  @Input()
  public meetingId: string;


  @ViewChild("booking") booking: TemplateRef<any>;

  public timer: SessionStampTimer;
  private subscription: Subscription;

  constructor(private timerService: SessionTimeTrackingServiceService) { }

  ngOnInit(): void {
      this.init();
      this.subscription = this.timerService.timerActionStream.subscribe( ()=>{
         this.init();
      });
  }

  ngOnDestroy() {
      if( this.subscription ) this.subscription.unsubscribe();
  }

    public init(): void{
    this.timer = this.timerService.timeStamp(this.meetingId,this.sessionId);
  }

  public play(){
      this.init();
      if( this.timer ){
          this.timer.play();
      } else {
          this.timer = this.timerService.start(this.meetingId,this.sessionId);
      }
  }

  public pause(){
      this.timerService.pause(this.timer);
  }

  public reset(){
      this.timer.reset();
  }

  public combinedTime(){
      if(!this.timer) return 0;
      return this.timer.combinedTime();
  }


  get running(){
      if( this.timer && this.timer.running ) return true;
      return false;
  }

    public diff(){
        if( !this.timer ) return "00h 00m 00s";
        return this.timer.diff();
    }


}
