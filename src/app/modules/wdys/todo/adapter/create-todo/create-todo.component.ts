import {Component, Input, OnInit} from '@angular/core';
import {CreateMeetingTodoCommand} from "../../domain/todo-commands";
import {MeetingTodoCommandService} from "../../application/meeting-todo-command.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.scss']
})
export class CreateTodoComponent implements OnInit {

  @Input()
  public sessionId: string;

  @Input()
  public meetingId: string;

  public cmd: CreateMeetingTodoCommand;

  constructor(  private command: MeetingTodoCommandService) { }

  ngOnInit(): void {
      this.cmd = new CreateMeetingTodoCommand();
        this.cmd.meetingId = this.meetingId;
        this.cmd.sessionId = this.sessionId;
  }

  public save(){
      if( this.cmd.description == null || this.cmd.description === '' ){

      }else{
          this.command.createMeetingTodo( this.cmd , (resp=>{
          }) );
      }

  }

}
