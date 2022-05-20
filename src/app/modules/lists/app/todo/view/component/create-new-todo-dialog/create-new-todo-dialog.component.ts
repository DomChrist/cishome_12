import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TodoListServiceService} from "../../../application/todo-list-service.service";
import {Todo} from "../../../model/todo-model";
import {NewTodoCommand} from "../../../model/todo-commands";

@Component({
  selector: 'app-create-new-todo-dialog',
  templateUrl: './create-new-todo-dialog.component.html',
  styleUrls: ['./create-new-todo-dialog.component.css']
})
export class CreateNewTodoDialogComponent implements OnInit {

  constructor( private $service: TodoListServiceService) { }

  @Input('visible')
  visible: boolean = false;

  @Output('visibleChange')
  visibleChange = new EventEmitter<boolean>();

  public title: string;
  public due: Date;

  ngOnInit(): void {
  }

  public save(){
      const requestDate = new Date(Date.UTC(this.due.getFullYear(), this.due.getMonth(), this.due.getDate()));

      const request = new NewTodoCommand();
      request.title = this.title;
      request.due = requestDate;

      console.log(request);

      this.$service.save( request , (t: Todo) => {
        this.visible = false;
        this.title = '';
      });
  }

}
