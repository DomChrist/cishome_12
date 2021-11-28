import { Injectable } from '@angular/core';
import {CisHttpService} from "../../meeting/application/service/cis-http.service";
import {CreateMeetingNoteCommand} from "../domain/meeting-note-commands";
import {MeetingNote} from "../domain/meeting-note-model";
import {Observable, Subject, Subscription} from "rxjs";
import {Meeting} from "../../meeting/domain/meeting-model";

@Injectable({
  providedIn: 'root'
})
export class MeetingNoteService {

  constructor( private http: CisHttpService) { }

  private sessionNotesSubject: Subject<MeetingNote> = new Subject<MeetingNote>();
  private sessionNotesListener: Observable<MeetingNote> = this.sessionNotesSubject.asObservable();

  private notesSubject: Subject<MeetingNote[]> = new Subject<MeetingNote[]>();
  public notesStream$: Observable<MeetingNote[]> = this.notesSubject.asObservable();

  public notes: MeetingNote[];

  public saveMeetingNote( cmd: CreateMeetingNoteCommand , success:(note:MeetingNote)=>void){

      const url = 'wdys/meetingnote/cmd/new';
      this.http.cisPost<MeetingNote>( url , cmd ).subscribe( (resp)=>{
        success(resp.body);
        this.findBySession( cmd.sessionId , (resp)=>{
               this.notes = resp;
        });
        this.sessionNotesSubject.next( resp.body );
      } );

  }

  public findBySession( session:string, success:(notes:Array<MeetingNote>)=>void ): Subscription{
      const url = 'wdys/meetingnote/query/session/' + session;
      return this.http.cisGet<Array<MeetingNote>>( url ).subscribe( (resp)=>{
          this.notes = resp.body;
          this.notesSubject.next( resp.body );
          success(resp.body);
      });
  }

  public findByMeeting( meeting:string, success:(notes:Array<MeetingNote>)=>void ): Subscription{
      const url = 'wdys/meetingnote/query/meeting/' + meeting;
      return this.http.cisGet<Array<MeetingNote>>( url ).subscribe( (resp)=> success(resp.body) );
  }

  public subscribeMeetingTodos(): Observable<MeetingNote>{
      return this.sessionNotesSubject.asObservable();
  }


}
