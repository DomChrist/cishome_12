import { Component, OnInit } from '@angular/core';
import {MeetingCommandService} from "../../../application/service/meeting-command.service";
import {CreateNewMeeting} from "../../../domain/commands";
import {CisAuthService} from "../../../../../../system/cis-connector/services/cis-auth-service.";
import {Participant} from "../../../../participant/domain/model/participant-model";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {throwError} from "rxjs";

@Component({
  selector: 'app-new-meeting',
  templateUrl: './new-meeting.component.html',
  styleUrls: ['./new-meeting.component.scss']
})
export class NewMeetingComponent implements OnInit {

  public showCreateParticipantDialog = false;

  private _participants = new Array<Participant>();

    private _cmd: CreateNewMeeting;

    constructor( private meetingCommand: MeetingCommandService , private cis: CisAuthService , private router: Router, private message:MessageService) {
      this.cis.checkAuth();
  }

  ngOnInit(): void {
  }


  get cmd(){
      if( !this._cmd ){
          this._cmd = new CreateNewMeeting();
      }
      return this._cmd;
  }


    get participants(): Participant[] {
        return this._participants;
    }

    set participants(value: Participant[]) {
        this._participants = value;
    }

    public save(){
      console.log("--- CreateNewMeetingCommand ---")
        console.log(this._participants);
        console.log(this.cmd)
      console.log("--- CreateNewMeetingCommand ---")

      this.validate( ()=>{
          this.meetingCommand.createMeeting( this.cmd ).subscribe( (resp)=> {
              this.router.navigate(['/', 'app', 'wdys', 'meeting', 'view', resp.body['id']]);
          });
      } , (error)=>{
         this.message.add({severity:'error' , summary: error});
      });
  }

  private validate( success:()=>void , failed:(message:string)=>void ){
        if( !this.cmd.meetingTime ){
            failed('Meeting time is empty');
            return;
        }
        if( (!this.cmd.subject || this.cmd.subject === '') || (!this.cmd.description || this.cmd.description === '') ){
            failed('Subject or Description is empty');
            return;
        }
        success();
  }


    add( p: Participant[]) {
        this._cmd.participants = p;
    }
}
