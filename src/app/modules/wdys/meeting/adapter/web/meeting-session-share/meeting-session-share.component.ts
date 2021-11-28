import {Component, Input, OnInit} from '@angular/core';
import {MeetingSessionService} from "../../../application/service/meeting-session.service";
import {Session} from "../../../domain/meeting-model";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-meeting-session-share',
  templateUrl: './meeting-session-share.component.html',
  styleUrls: ['./meeting-session-share.component.scss']
})
export class MeetingSessionShareComponent implements OnInit {

   @Input()
   public session: Session;

   collaboration: object;

  constructor( private meetingSession: MeetingSessionService, private message: MessageService) { }

  ngOnInit(): void {
      this.load();
  }

  get code(){
      if(!this.collaboration) return '';
      return this.collaboration['collaborationSessionCode'];
  }

  get link(){
      const uri = location.protocol + '//' + location.hostname + ':' + location.port + '/app/wdys/meeting/collaboration/session/' + this.session.meetingSessionId;
      return uri;
  }


  private load(){
      this.meetingSession.loadCollaboration(this.session , (success)=>{
          this.collaboration = success;
      });
  }

  public activate(){
        this.meetingSession.collaborate( this.session.meetingId , this.session.meetingSessionId , (obj)=>{
            this.collaboration = obj;
        });
  }

  public copy( text:string ){
      navigator.clipboard.writeText( text );
      this.message.add( {severity:'success' , summary:'copied'} );
  }

}
