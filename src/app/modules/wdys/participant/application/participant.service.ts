import { Injectable } from '@angular/core';
import {CisHttpService} from "../../meeting/application/service/cis-http.service";
import {Participant} from "../domain/model/participant-model";
import {Observable, Subject, Subscription} from "rxjs";
import {CreateParticipantCommand} from "../adapter/web/create-participant-dialog/create-participant-dialog.component";

@Injectable({
  providedIn: 'root'
})
export class ParticipantService {

  public list = new Array<Participant>();

  private participantSubject = new Subject<Participant[]>();
  public participantObservable$ = this.participantSubject.asObservable();

  constructor( private http: CisHttpService) {
      this.load( this._next );
  }

  public add(){

  }

  public subscribe( fu:(p:Participant[])=>void ): Observable<Participant[]> {
      this.load( p=>{
         console.log(p);
         this._next(p);
      });
      if( !this.list ){
            this.load( (participants)=>{
                this._next(participants);
                fu(participants);
            });
      } else {
          fu(this.list);
      }
      return this.participantObservable$;
  }

  get participants(): Participant[]{
      if( !this.list ) this.load( this._next );
      return this.list;
  }

  private load( success:(p:Participant[])=>void ): void {
      let url = 'wdys/participant/query/all';
      this.http.cisGet<Participant[]>(url).subscribe( (resp)=> {
          console.log( resp.body );
          this.list = resp.body;
          //success(resp.body);
          //this.participantSubject.next( resp.body );
          //success( resp.body );
      });
  }

  private _next( p:Participant[] ){
      console.log(p);
      if( p == undefined ) p = [];
      this.list = p;
      this.participantSubject.next(this.list);
  }


    public observe( func:()=>Observable<Participant[]> ) {

    }

    public newParticipant( cmd:CreateParticipantCommand , success:()=>void , error:()=>void ) {
        const url = "wdys/participant/cmd/new";
        this.http.cisPost( url , cmd ).subscribe( (resp)=>{
            this.load( (p => {
                this.list = p;
            }));
            success();
        } , (e)=>error());
    }

}
