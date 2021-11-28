import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Meeting, Session} from "../../../domain/meeting-model";
import {Participant} from "../../../../participant/domain/model/participant-model";
import {CreateMeetingNoteCommand} from "../../../../meetingnote/domain/meeting-note-commands";
import {MeetingNoteService} from "../../../../meetingnote/application/meeting-note.service";
import {MeetingNote} from "../../../../meetingnote/domain/meeting-note-model";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-create-meeting-note',
  templateUrl: './create-meeting-note.component.html',
  styleUrls: ['./create-meeting-note.component.scss']
})
export class CreateMeetingNoteComponent implements OnInit {

  @Input()
  public session: Session;

  @Output()
  public created: EventEmitter<MeetingNote> = new EventEmitter<MeetingNote>();

  public participants: Array<Participant>;

  public participant: Participant;

  public note: CreateMeetingNoteCommand;

  constructor( private meetingService: MeetingNoteService , private message: MessageService) { }

  ngOnInit(): void {
      this.participants = this.session.participants;
      this.newMeetingNote();
  }

  public newMeetingNote(){
      this.note = new CreateMeetingNoteCommand();
        this.note.meetingId = this.session.meetingId;
        this.note.sessionId = this.session.meetingSessionId;
  }

  public select( p:Participant ){
      this.newMeetingNote();
      this.participant = p;
  }

  public save(){
      if( this.participant ){
          this.note.participantId = this.participant.id;
      }
      if( this.note.note === null || this.note.note === '' ){
          this.message.add( {severity:'warn' , summary: 'Note is empty' , detail: 'node must contain add least 3 characters' , life: 2000} )
          return;
      }
      this.meetingService.saveMeetingNote( this.note , (resp)=>{
          this.message.clear();
          this.message.add( {severity:'success' , summary: 'Note created' , detail: 'node added to meetingsession' , life: 2000} )
          this.created.subscribe( resp );
            this.participant = null;
            this.note.note = '';
      });
  }

}

export class MeetingResponse{
    public meetingList: Array<Meeting>;
    public order: Array<string>;
}
