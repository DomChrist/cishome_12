import {Component, Input, OnInit} from '@angular/core';
import {Meeting, MeetingDateRange} from "../../../domain/meeting-model";
import {Participant} from "../../../../participant/domain/model/participant-model";
import {CreateNewSession} from "../../../domain/commands";
import {MeetingService} from "../../../application/service/meeting.service";
import {MeetingCommandService} from "../../../application/service/meeting-command.service";
import {MessageService} from "primeng/api";
import {error} from "protractor";

@Component({
  selector: 'app-add-session',
  templateUrl: './add-session.component.html',
  styleUrls: ['./add-session.component.scss']
})
export class AddSessionComponent implements OnInit {

  constructor( private meetingService:MeetingCommandService, private messaging: MessageService) { }

  @Input()
  public meeting: Meeting;

  public date: Date;

  public participantFromMeeting = false;

  public cmd: CreateNewSession;

  ngOnInit(): void {
      this.clear();
  }

  public handleParticipants(event:Participant[]){
      this.cmd.participants = event;
  }

  get firstDate(): Date{
      if( !this.meeting.dateRange ) return null;
      return new Date(this.meeting.dateRange.firstDate);
  }

  public save(): void{
      this.cmd.meetingId = this.meeting.id;
      this.cmd.meetingDateString = this.toDateString( this.cmd.meetingDate );
      console.log(this.cmd.meetingDate);
      if( this.cmd.participantsFromMeeting ){
          this.cmd.participants = this.meeting.participants;
      }
      this.messaging.clear();
      this.meetingService.createSession( this.cmd , ()=>{
          this.messaging.add( {severity:'success' , summary:'Session created' , life:5} );
          this.clear();
      } , ()=>{
          this.messaging.add( {severity:'error' , summary:'Session could not be created' , life:5} )
      });
    }

    private toDateString( date: Date ){

      let day   = date.getDate() >= 10 ? date.getDate().toString() : '0' + date.getDate().toString();
      let m     = date.getMonth() + 1;
      let month = m >= 10 ? m : '0' + m;
      let year  = date.getFullYear();

      console.log( day );
      return year+'-'+month+"-"+day;
    }


    private clear() {
        this.date = null;
        this.participantFromMeeting = false;
        this.cmd = new CreateNewSession();
    }
}
