import { Injectable } from '@angular/core';
import {CisHttpService} from "../../meeting/application/service/cis-http.service";
import {MeetingToDo, MeetingTodoAggregate} from "../domain/meeting-todo-model";
import {Subscription} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MeetingTodoQueryService {

  constructor( private http: CisHttpService) { }

    public loadByMeeting( meeting: string , fu:(body:MeetingTodoAggregate)=>void ): Subscription{
        let url = 'wdys/todo/query/meeting?id=' + meeting;
        let s = this.http.cisGet<MeetingTodoAggregate>( url ).subscribe( (resp)=>{
            fu(resp.body);
        });
        return s;
    }


}
