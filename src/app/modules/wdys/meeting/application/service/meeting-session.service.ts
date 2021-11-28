import { Injectable } from '@angular/core';
import {CisHttpService} from "../../../../../system/cis-connector/services/cis-http.service";
import {Session} from "../../domain/meeting-model";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../../environments/environment";
import {PresentationModeResponse} from "../../domain/meeting-response";

@Injectable({
  providedIn: 'root'
})
export class MeetingSessionService {

  constructor( private http: CisHttpService, private httpClient: HttpClient) { }


  public addParticipant( meetingId, sessionId, participantId , success:(s:Session)=>void ){
      const url = "meeting/session/cmd/participant/add";
      const request = {
          "meeting" : meetingId,
          "session" : sessionId,
          "participantId" : participantId
      };
      this.http.cisPost<Session>( url , request ).subscribe( (resp)=>{
         success( resp.body );
      });
  }

  public collaborate( meetingId: string, sessionId: string , success:(activation:object)=>void ){
      let path = 'meeting/activate/meeting/'+meetingId+'/session/' + sessionId;
      this.http.cisPost<object>( path , {}  ).subscribe( (resp)=>{
            success(resp.body);
      } , error => {

      });
  }

    loadCollaboration(session: Session , success:(obj:object)=>void) {
        let path = 'meeting/activate/meeting/'+session.meetingId+'/session/' + session.meetingSessionId;
        this.http.cisGet<object>( path ).subscribe( (resp) => success(resp.body) )
    }

    loadCollaboratedSession( session: string , code: string , success:(r: PresentationModeResponse)=>void, error:()=>void ){
        let path = environment.cisHome.service + 'meeting/collaboration/session/'+session+'?code='+code;
        this.httpClient.get<PresentationModeResponse>( path , {observe:'response'}).subscribe( (resp)=>{
            console.log(resp.body);
            success(resp.body);
        } , e=>error());
    }

}
