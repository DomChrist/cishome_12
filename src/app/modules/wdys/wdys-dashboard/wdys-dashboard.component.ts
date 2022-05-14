import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";
import {CisHttpService} from "../meeting/application/service/cis-http.service";
import {DASH} from "@angular/cdk/keycodes";
import {MenuItem} from "primeng/api";
import {Router} from "@angular/router";

@Component({
  selector: 'app-wdys-dashboard',
  templateUrl: './wdys-dashboard.component.html',
  styleUrls: ['./wdys-dashboard.component.scss']
})
export class WdysDashboardComponent implements OnInit {

  private DASH: string = "meeting/dashboard/query/";

  public commandItems: MenuItem[];


  public count: MeetingDashboardCounting;
  public communications: MostCommunicationParticipants[];
  public lastMeetings: LastEditedMeetings[];
  public todos: OverdueTodos[];
  public lastNotesList: LastNotes[];

  constructor(private titleService: Title , private service: CisHttpService, private router: Router) { }

  ngOnInit( ): void {
        this.titleService.setTitle('Meeting');
        this.loadCounting();
        this.mostCommunications();
        this.lastEditedMeetings();
        this.overdue();
        this.lastNotes();

      this.commandItems = [
          {label: 'Participants', icon: 'pi pi-users', routerLink: ['participants']},
          {label: 'Delete', icon: 'pi pi-times', command: () => {}},
          {label: 'Angular.io', icon: 'pi pi-info', url: 'http://angular.io'},
          {separator: true},
          {label: 'Setup', icon: 'pi pi-cog', routerLink: ['/setup']}
      ];
  }

  public newMeetingRouting(){
      this.router.navigate(['/app/wdys','meeting','add']);
  }

  public loadCounting(){
      this.service.cisGet<MeetingDashboardCounting>( 'meeting/dashboard/query/countings' )
          .subscribe((resp=>{
              this.count = resp.body;
          }));
  }

  public mostCommunications(){
      this.service.cisGet<MostCommunicationParticipants[]>( 'meeting/dashboard/query/mostCommunications' )
          .subscribe((resp=>{
              this.communications = resp.body;
          }));
  }

  public lastEditedMeetings(){
      this.service.cisGet<LastEditedMeetings[]>( 'meeting/dashboard/query/lastEditedMeetings' )
          .subscribe((resp=>{
              this.lastMeetings = resp.body;
          }));
  }

  public overdue(){
      this.service.cisGet<OverdueTodos[]>( 'meeting/dashboard/query/overdue' )
          .subscribe((resp=>{
              this.todos = resp.body;
          }));
  }

  public lastNotes(){
      this.service.cisGet<LastNotes[]>( 'meeting/dashboard/query/lastNotes' )
          .subscribe((resp=>{
              console.log(resp.body);
              this.lastNotesList = resp.body;
          }));
  }


}

export interface MeetingDashboardCounting {
    id: string;
    meetings: number;
    activeMeetings: number;
    sessions: number;
    todos: number;
    todosDone: number;
    notes: number;
}

export interface MostCommunicationParticipants {
    id: string;
    count: number;
    firstName: string;
    lastName: string;
    initial: string;
    mail: string;
}


export interface LastEditedMeetings {
    id: string;
    topic: string;
    localDate: string;
    finishedInPercent:number;
    todosDone: number;
    todosOpen: number;
}

export interface OverdueTodos {
    id: string;
    meeting: string;
    session: string;
    done: boolean;
    label: string;
    dueDate: Date;
    created: Date;
    dueDays: number;
    dueDaysTillDeadline: number;
}

export interface Participant {
    id: string;
    firstName: string;
    lastName: string;
    mail: string;
    creator: string;
    version: number;
    created: Date;
    updated: Date;
}

export interface LastNotes {
    id: string;
    meeting: string;
    session: string;
    note: string;
    participantId: string;
    participant: Participant;
    dayString: string;
}
