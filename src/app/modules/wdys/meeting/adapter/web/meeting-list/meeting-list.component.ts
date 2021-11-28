import {Component, OnDestroy, OnInit} from '@angular/core';
import {MeetingService} from "../../../application/service/meeting.service";
import {Meeting} from "../../../domain/meeting-model";
import {Subscription} from "rxjs";
import {MeetingSearchResponse} from "../../../domain/meeting-response";
import {Router} from "@angular/router";

@Component({
  selector: 'app-meeting-list',
  templateUrl: './meeting-list.component.html',
  styleUrls: ['./meeting-list.component.scss']
})
export class MeetingListComponent implements OnInit , OnDestroy {

  constructor( private meetingService: MeetingService , private router: Router) { }

  public meetings: Array<Meeting>;
  public orderby: Array<string>;
  private subscription: Subscription;

  public showNewMeetingDialog = false;

    public searchline: string = '';

    public searchResponse = new Array<MeetingSearchResponse>();

    ngOnInit(): void {
      this.orderby = this.meetingService.ORDER_BY;
      /*
      this.subscription = this.meetingService.subscribeMeetingList( (list)=>{
         this.meetings = list;
      });
       */
      this.meetingService.searchResult$.subscribe( data => {
        this.searchResponse = data;
      } );
      this.meetingService.search(undefined);
  }

  ngOnDestroy(): void {
      //this.subscription.unsubscribe();
  }

  public search(){
        this.meetingService.search( this.searchline );
  }

  public open( m: MeetingSearchResponse ){
        this.meetingService.load(m.id);
        this.router.navigate(['/app/wdys/meeting/view',m.id]);
  }

}
