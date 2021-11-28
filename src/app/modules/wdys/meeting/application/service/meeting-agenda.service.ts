import { Injectable } from '@angular/core';
import {CisHttpService} from "../../../../../system/cis-connector/services/cis-http.service";
import {MeetingAgenda} from "../../adapter/web/meeting-agenda-overview/meeting-agenda-overview.component";

@Injectable({
  providedIn: 'root'
})
export class MeetingAgendaService {

  constructor( private http: CisHttpService) { }

  public load( meeting:string, session: string , success:(obj:MeetingAgenda)=>void , error:()=>void  ){
      const url = 'meeting/session/agenda/meeting/' + meeting + '/session/' + session;
      this.http.cisGet<MeetingAgenda>( url ).subscribe( (resp)=>{
          success(resp.body);
      } , e=>{
          error();
      })
  }

  public createNew( meeting:string, session: string , name: string ){
    let request = {
        name : name
    }
    const url = 'meeting/session/agenda/meeting/' + meeting + '/session/' + session;
    this.http.cisPost<MeetingAgenda>( url , request ).subscribe( (resp) =>{

    });
  }




}
