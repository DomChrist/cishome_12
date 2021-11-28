import { Injectable } from '@angular/core';
import {CisHttpService} from "./cis-http.service";
import {NewMeetingComponent} from "../../adapter/web/new-meeting/new-meeting.component";
import {CreateNewMeeting, CreateNewSession} from "../../domain/commands";
import {Observable} from "rxjs";
import {MeetingService} from "./meeting.service";
import {Meeting} from "../../domain/meeting-model";

@Injectable({
  providedIn: 'root'
})
export class MeetingCommandService {

  constructor( private http: CisHttpService, private meetingService: MeetingService) { }

   public createMeeting( cmd: CreateNewMeeting ): Observable<any>{
      return this.http.cisPost( 'meeting/cmd/new' , cmd );
   }

   public createSession( cmd: CreateNewSession , success:()=>void , error:()=>void ){
       this.http.cisPost<Meeting>('meeting/session/cmd/new' , cmd ).subscribe( (resp)=>{
            this.meetingService.add( resp.body );
            success();
       } , (e)=>{
           error();
       });
   }



}
