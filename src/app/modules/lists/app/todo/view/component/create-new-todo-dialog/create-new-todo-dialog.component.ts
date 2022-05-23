import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TodoListService} from "../../../application/todo-list.service";
import {Todo} from "../../../model/todo-model";
import {NewTodoCommand} from "../../../model/todo-commands";

@Component({
  selector: 'app-create-new-todo-dialog',
  templateUrl: './create-new-todo-dialog.component.html',
  styleUrls: ['./create-new-todo-dialog.component.css']
})
export class CreateNewTodoDialogComponent implements OnInit {

  constructor( private $service: TodoListService) { }

  @Input('visible')
  visible: boolean = false;

  @Output('visibleChange')
  visibleChange = new EventEmitter<boolean>();

  public title: string;
  public due: Date;

  public request = new NewTodoCommand();


    ngOnInit(): void {
        this.request = new NewTodoCommand();
    }

  public save(){
      if( this.request.due ){
          console.log( this.request.due );
          this.request.due = new Date(Date.UTC(this.request.due.getFullYear(), this.request.due.getMonth(), this.request.due.getDate()));
          console.log( this.request.due );
      }

      console.log(this.request);

      this.$service.save( this.request , (t: Todo) => {
        this.visible = false;
        this.request = new NewTodoCommand();
      });
  }

}

