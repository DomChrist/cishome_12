import { Injectable } from '@angular/core';
import {CisHttpService} from "../../meeting/application/service/cis-http.service";
import {Subscription} from "rxjs";
import {CreateMeetingTodoCommand} from "../domain/todo-commands";
import {MeetingToDo, SessionTodoAggregate} from "../domain/meeting-todo-model";

@Injectable({
  providedIn: 'root'
})
export class MeetingTodoCommandService {

  constructor(private http: CisHttpService) { }

  public load( session: string , fu:(body:SessionTodoAggregate)=>void ): Subscription{
      let url = 'wdys/todo/query/session?id=' + session;
      let s = this.http.cisGet<SessionTodoAggregate>( url ).subscribe( (resp)=>{
          fu(resp.body);
      });
      return s;
    }


    public createMeetingTodo(cmd: CreateMeetingTodoCommand , fu:(t:MeetingToDo)=>void  ) {
        let url = 'wdys/todo/cmd/add';
        this.http.cisPost<MeetingToDo>( url , cmd ).subscribe((resp)=>{
            fu(resp.body);
        });
    }

    public done( id:string, fn:(todo:MeetingToDo)=>void ){
        let url = "wdys/todo/cmd/" + id + "/done";
        let sub = this.http.cisPost<MeetingToDo>( url , null ).subscribe( (resp=>{
            fn( resp.body );
        }));

    }

    public open( id:string, fn:(todo:MeetingToDo)=>void ){
        let url = "wdys/todo/cmd/" + id + "/open";
        let sub = this.http.cisPost<MeetingToDo>( url , null ).subscribe( (resp=>{
            fn(resp.body);
        }));
    }

    public delete( id:string , success:()=>void ){
      let url = "wdys/todo/cmd/" + id;
      this.http.cisDelete(url).subscribe( (resp)=>{
             success();
      });
    }


}
