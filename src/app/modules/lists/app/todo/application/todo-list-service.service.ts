import { Injectable } from '@angular/core';
import {CisHttpService} from '../../../../../system/cis-connector/services/cis-http.service';
import {MultiTodoResponse, Todo} from '../model/todo-model';
import {NewTodoCommand} from '../model/todo-commands';
import {Observable, Subject} from "rxjs";
import {TodoResponseChanged} from "../model/todo-events";

@Injectable({
  providedIn: 'root'
})
export class TodoListServiceService {

  private $response: MultiTodoResponse;

  private $subject = new Subject<TodoResponseChanged>();
  private $changeListener: Observable<TodoResponseChanged>;

  constructor( private http: CisHttpService) {
        this.$changeListener = this.$subject.asObservable();
  }

  public loadAll( successCallback: ( m: MultiTodoResponse ) => void ){

    this.http.cisGet<MultiTodoResponse>( 'lists/todo/v1/all' )
        .subscribe( (resp) => {
            this.$response = resp.body;
            successCallback( this.$response );
        });
  }

  public save( cmd: NewTodoCommand, successCallback: ( t: Todo ) => void ){
      this.http.cisPost<Todo>('lists/todo/v1/list' , cmd)
          .subscribe( (resp) => {
              this.$response.list.push( resp.body );

              const event = new TodoResponseChanged();
              event.response = this.$response;
              event.todoAdded = resp.body;

              this.$subject.next( event );
              successCallback( resp.body );
          });
  }

  public done( id: string, successCallback: () => void ){
      this.http.cisPut( 'lists/todo/v1/list/' + id + '/done' , undefined )
          .subscribe( (resp) => {
                this.$response.list = this.$response.list.filter( i => i.id !== id );

                const event = new TodoResponseChanged();
                event.response = this.$response;

                this.$subject.next( event );
                successCallback();
          });
  }

  public changeListener(): Observable<TodoResponseChanged> {
      return this.$changeListener;
  }

}
