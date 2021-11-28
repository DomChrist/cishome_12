import {Component, Input, OnInit} from '@angular/core';
import {Meeting, Session} from "../../../meeting/domain/meeting-model";
import {MeetingCommandService} from "../../../meeting/application/service/meeting-command.service";
import {MeetingTodoCommandService} from "../../application/meeting-todo-command.service";
import {MeetingToDo, SessionTodoAggregate} from "../../domain/meeting-todo-model";
import {CreateMeetingTodoCommand} from "../../domain/todo-commands";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-view-session-todo',
  templateUrl: './view-session-todo.component.html',
  styleUrls: ['./view-session-todo.component.scss']
})
export class ViewSessionTodoComponent implements OnInit {

  @Input()
  public meeting: string;

  @Input()
  public session: string;

  @Input()
  public showHeader = false;

  public showCreateDialog = false;

  public todoList: Array<MeetingToDo>;
  public todoSessionAggregate: SessionTodoAggregate;

  public cmd: CreateMeetingTodoCommand;

  public selectedTodo: string;

  constructor( private route: ActivatedRoute , private commandService: MeetingTodoCommandService) { }

  ngOnInit(): void {
      this.cmd = this.newCommand();
      this.commandService.load( this.session , (data:SessionTodoAggregate)=>{
          this.todoSessionAggregate = data;
          this.todoList = data.todos;
      });
      this.route.queryParamMap.subscribe( (map)=>{
          if( map.has('todo') ){
              this.selectedTodo = map.get('todo');
          }
      });
  }

  private newCommand(){
      let c = new CreateMeetingTodoCommand();
        c.sessionId = this.session;
        c.meetingId = this.meeting;
    return c;
  }

  public addNewTodo(){
      if( this.cmd.description != null && this.cmd.description !== '' ){
          this.commandService.createMeetingTodo( this.cmd , (r:MeetingToDo)=>this.todoList.push(r) );
          this.cmd = this.newCommand();
      }
  }

  public toggle(todo:MeetingToDo){
        if( todo.checked ){
            this.done( todo );
        } else {
            this.open( todo );
        }
  }

  public done( todo:MeetingToDo ){
      this.commandService.done( todo.id , (t)=>{
         todo = t;
      });
  }

  public open( todo:MeetingToDo ){
      this.commandService.open( todo.id , (t)=>{
         todo = t;
      });
  }

  public delete( todo:MeetingToDo ){
      this.commandService.delete( todo.id , ()=>{
          this.todoList = this.todoList.filter( t=>t.id !== todo.id );
      });
  }



}
