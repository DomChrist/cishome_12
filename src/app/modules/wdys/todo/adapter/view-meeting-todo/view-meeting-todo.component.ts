import {Component, Input, OnInit} from '@angular/core';
import {MeetingTodoQueryService} from "../../application/meeting-todo-query.service";
import {MeetingToDo} from "../../domain/meeting-todo-model";

@Component({
  selector: 'app-view-meeting-todo',
  templateUrl: './view-meeting-todo.component.html',
  styleUrls: ['./view-meeting-todo.component.scss']
})
export class ViewMeetingTodoComponent implements OnInit {

    @Input()
    public meeting: string;

    public todos: MeetingToDo[];

  constructor( private queryService: MeetingTodoQueryService) { }

  ngOnInit(): void {

        this.queryService.loadByMeeting(this.meeting , (resp)=>{
            if( resp ){
                this.todos = resp.todos;
            }
        });

  }

}
