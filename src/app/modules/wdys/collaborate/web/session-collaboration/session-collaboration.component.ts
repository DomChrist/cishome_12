import { Component, OnInit } from '@angular/core';
import {MeetingSessionService} from "../../../meeting/application/service/meeting-session.service";
import {ActivatedRoute} from "@angular/router";
import {error} from "protractor";
import {Session} from "../../../meeting/domain/meeting-model";
import {MeetingAgenda} from "../../../meeting/domain/meeting-agenda";
import {PresentationModeResponse} from "../../../meeting/domain/meeting-response";

@Component({
  selector: 'app-session-collaboration',
  templateUrl: './session-collaboration.component.html',
  styleUrls: ['./session-collaboration.component.scss']
})
export class SessionCollaborationComponent implements OnInit {

  code: string;
  sessionId: string;
  private valid = false;

  response: PresentationModeResponse;

  constructor( private session:MeetingSessionService, private route:ActivatedRoute ){ }

  ngOnInit(): void {
      this.route.paramMap.subscribe( map=>{
          this.sessionId = map.get('id');
          this.load();
      });
  }

  load(){
        this.session.loadCollaboratedSession( this.sessionId , this.code , (r)=>{
            this.valid = true;
            this.response = r;
        } , ()=>{

        });
  }

  get isCodeInput():boolean{
        if( this.code ) return true;
        return false;
  }

  get isValid(): boolean{
      return this.valid;
  }

}


