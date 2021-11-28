import {Component, Input, OnInit} from '@angular/core';
import {MeetingAgendaService} from "../../../application/service/meeting-agenda.service";

@Component({
  selector: 'app-meeting-agenda-overview',
  templateUrl: './meeting-agenda-overview.component.html',
  styleUrls: ['./meeting-agenda-overview.component.scss']
})
export class MeetingAgendaOverviewComponent implements OnInit {

  @Input()
  meetingId: string;
  @Input()
  sessionId: string;

  showNewAgendaDialog = false;

  newAgendaCmd: NewAgendaCommand;

  meetingAgenda: MeetingAgenda;
  loadFinished = false;

  constructor( private agendaService: MeetingAgendaService) { }

  ngOnInit(): void {
        this.load();
  }

  private load(){
      this.agendaService.load(this.meetingId, this.sessionId , (agenda)=>{
            this.meetingAgenda = agenda;
            this.loadFinished = true;
      } , ()=>{

      })
  }

  showOpenNewAgendaCommand(){
      this.newAgendaCmd = new NewAgendaCommand();
      this.showNewAgendaDialog = true;
  }

  saveNewAgenda(){
      this.agendaService.createNew(this.meetingId, this.sessionId, this.newAgendaCmd.name);
  }

}

class NewAgendaCommand{
    name:string;
}

export interface Meeting {
    value: string;
}

export interface Session {
    value: string;
}

export interface MeetingSessionId {
    meeting: Meeting;
    session: Session;
}

export interface Id {
    id: string;
}

export interface Name {
    name: string;
}

export interface Status {
    status: number;
    open: boolean;
}

export interface MeetingPoint {
    id: Id;
    name: Name;
    status: Status;
}

export interface MeetingAgenda {
    meetingSessionId: MeetingSessionId;
    meetingPoints: MeetingPoint[];
}
