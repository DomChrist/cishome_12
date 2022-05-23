import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Todo} from "../../../model/todo-model";

@Component({
  selector: 'todo-todoitem',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  constructor() { }

  public t: Todo;

  @Output()
  public onDone = new EventEmitter<Todo>();

  ngOnInit(): void {
  }


  @Input()
  set todo( t: Todo ){
      this.t = t;
  }

  public done(){
      this.onDone.emit( this.t );
  }

}
