import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CisHttpService} from "../../../application/service/cis-http.service";
import {MeetingService} from "../../../application/service/meeting.service";
import {Meeting, Participant, Session} from "../../../domain/meeting-model";
import {MenuItem, PrimeIcons} from "primeng/api";
import {MeetingSessionTimeAggregate, Time} from "../../../../timetracker/domain.model/meeting-session-time-booking";

@Component({
  selector: 'app-meeting-overview',
  templateUrl: './meeting-overview.component.html',
  styleUrls: ['./meeting-overview.component.scss']
})
export class MeetingOverviewComponent implements OnInit {

  constructor( private route: ActivatedRoute , private meetingService: MeetingService, private http:CisHttpService) { }

  public id: string;
  public meeting: Meeting;
  public timeAggregate: MeetingSessionTimeAggregate;
  public time: Time;


  public items: MenuItem[];
  public commandItems: MenuItem[];

  public showNewMeetingDialog: boolean = false;
  public show_add_participants: boolean = false;
  public show_create_participants: boolean = false;

  ngOnInit(): void {
    this.initCommandItems();
      this.meetingService.meetingListObservable.subscribe( (m)=>{
          this.meeting = m.filter(me=>me.id === this.id )[0];
          this.items = [
              {label:'DASHBOARD' , routerLink:['/app/wdys' ]},
              {label:'MEETING' , routerLink:['/app/wdys/meeting/view' , this.meeting.id ]},
          ];

      });
      this.route.paramMap.subscribe( map=>{
         this.id = map.get('id');
         this.meetingService.load( this.id );
         this.loadTimeSpent(this.id);
      });
  }

  private initCommandItems(){
      this.commandItems = [
          {
              tooltip : 'add new Session',
              icon: 'pi pi-plus',
              command: () => {
                  this.showNewMeetingDialog = !this.showNewMeetingDialog
                  //this.messageService.add({ severity: 'info', summary: 'Add', detail: 'Data Added' });
              }
          },
          {
              tooltip : 'add new Session',
              icon: 'pi pi-refresh',
              command: () => {
                  //this.messageService.add({ severity: 'success', summary: 'Update', detail: 'Data Updated' });
              }
          },
          {
              tooltip : 'add new Session',
              icon: 'pi pi-trash',
              command: () => {
                  //this.messageService.add({ severity: 'error', summary: 'Delete', detail: 'Data Deleted' });
              }
          },
          {
              tooltip : 'Manage participants',
              icon: 'pi pi-users',
              command: () => {
                  this.show_add_participants = !this.show_add_participants
              }
          },
          {
              tooltip : 'add new Session',
              icon: 'pi pi-external-link',
              url: 'http://angular.io'

          }
      ];
  }

  public loadTimeSpent(meeting:string){
      this.http.cisGet<Time>('meeting/timebooking/query/stats/time/meeting/'+meeting).subscribe( (resp)=>{
          this.time = resp.body;
      });
  }

  public participants(s:Session): Array<Participant>{
      return s.participants;
  }

  public updateParticipants(events:Array<Participant>){

  }


  get color(){
      return "#43B3D0FF";
  }

  get icon(){
      return PrimeIcons.ENVELOPE;
  }

}


