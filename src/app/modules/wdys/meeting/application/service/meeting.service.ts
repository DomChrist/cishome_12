import { Injectable } from '@angular/core';
import {CisHttpService} from "./cis-http.service";
import {Observable, Subject, Subscription} from "rxjs";
import {Meeting, Session} from "../../domain/meeting-model";
import {MeetingSearchResponse} from "../../domain/meeting-response";

@Injectable({
  providedIn: 'root'
})
export class MeetingService {

  constructor( private http: CisHttpService) { }

  public meetingSubject = new Subject<Meeting>();
  public meetingObservable: Observable<Meeting> = this.meetingSubject.asObservable();

  public meetingListSubject = new Subject<Array<Meeting>>();
  public meetingListObservable: Observable<Array<Meeting>> = this.meetingListSubject.asObservable();

  public searchResultSubject = new Subject<MeetingSearchResponse[]>();
  public searchResult$ : Observable<MeetingSearchResponse[]> = this.searchResultSubject.asObservable();

  public meeting: Meeting;
  public meetings: Array<Meeting>;

  public meetingMap: Map<string,Meeting> = new Map();

  public ORDER_BY: Array<string>;

  public search( search: string){
      let url = 'meeting/query/search';
      if( search ) url = url.concat("?q=").concat(search);
      this.http.cisGet<MeetingSearchResponse[]>(url).subscribe( (resp)=>{
          this.searchResultSubject.next( resp.body );
      } );
  }

  public load( id: string ){
      if( this.meetingMap.has(id) ){
          this.meetingSubject.next( this.meetingMap.get(id) );
          this.meetingListSubject.next(this.meetings);
      } else {
          this.http.cisGet<Meeting>('meeting/query/'+id).subscribe( (resp)=>{
              this.meeting = resp.body;
              this.add(resp.body);
          });
      }
  }

  public loadAll(){
      this.search(undefined);
      this.http.cisGet<MeetingResponse>('meeting/query').subscribe( (resp)=>{
          this.ORDER_BY = resp.body.order;
          this.addAll(resp.body.meetingList);
      });
  }

  public subscribeMeetingList( fn: (observer:Array<Meeting>) => void ) : Subscription {
      let subscription = this.meetingListObservable.subscribe( fn );
      this.loadAll();
      return subscription;
  }

  public subscribeOnMeeting( meeting:string , fu: (list: Meeting)=>void){
      let subscription = this.meetingListObservable.subscribe( (list)=>{
         let element = list.filter(f=>f.id === meeting )[0];
         fu(element);
      });
      this.load( meeting );
      return subscription;
  }


    add(body: Meeting) {
        this.meetingMap.set( body.id , body );
        this.meetings = new Array<Meeting>();
            for( let m of this.meetingMap.values()){
                this.meetings.push(m);
            }
        this.meetingListSubject.next( this.meetings );
    }

    addAll( allMeetings: Array<Meeting> ){
        this.meetings = allMeetings;
        this.meetings.forEach( (m)=>this.meetingMap.set(m.id , m) )
        this.meetingListSubject.next( this.meetings );
    }

    public updateDescription( s: Session , success:(m:Meeting)=>void ){
      const url = 'meeting/session/cmd/description';
      let cmd = {
        reference : s.meetingId,
        description : s.description,
        sessionId : s.meetingSessionId
      }
      this.http.cisPost<Meeting>( url , cmd).subscribe( (r)=>success(r.body) );
    }

}

export class MeetingResponse{
    public meetingList: Array<Meeting>;
    public order: Array<string>;
}
