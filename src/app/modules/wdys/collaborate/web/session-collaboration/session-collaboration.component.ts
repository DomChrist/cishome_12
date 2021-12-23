import { Component, OnInit } from '@angular/core';
import {MeetingSessionService} from "../../../meeting/application/service/meeting-session.service";
import {ActivatedRoute} from "@angular/router";
import {error} from "protractor";
import {Session} from "../../../meeting/domain/meeting-model";
import {MeetingAgenda} from "../../../meeting/domain/meeting-agenda";
import {PresentationModeResponse} from "../../../meeting/domain/meeting-response";
import {CisHttpService} from "../../../meeting/application/service/cis-http.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../../environments/environment";
import {webSocket} from "rxjs/webSocket";

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

  constructor( private session:MeetingSessionService, private route:ActivatedRoute, private http: HttpClient){ }

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
            this.listen();
        } , ()=>{

        });
  }

    listen(){
        let path = environment.cisHome.socket + 'meeting/collaboration/change/'+this.response.session.meetingSessionId;
        const subject = webSocket(path);
        subject.subscribe( (data)=>{
            console.log(data);
            alert(data);
            this.load();
        } )
    }

  get isCodeInput():boolean{
        if( this.code ) return true;
        return false;
  }

  get isValid(): boolean{
      return this.valid;
  }

}


