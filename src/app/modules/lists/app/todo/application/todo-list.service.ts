import { Injectable } from '@angular/core';
import {CisHttpService} from '../../../../../system/cis-connector/services/cis-http.service';
import {FilterCategory, InCategories, MultiTodoResponse, Todo} from '../model/todo-model';
import {NewTodoCommand} from '../model/todo-commands';
import {Observable, Subject} from 'rxjs';
import {TodoResponseChanged} from '../model/todo-events';
import {FilterArguments, TodoPipe} from "../view/page/todo.pipe";
import {TodoFilterService} from "./todo-filter.service";

@Injectable({
  providedIn: 'root'
})
export class TodoListService {

  public response: MultiTodoResponse;
  public viewList: Array<Todo>;
  public $categories: Array<FilterCategory>;

  private $subject = new Subject<TodoResponseChanged>();
  private readonly $changeListener: Observable<TodoResponseChanged>;

  public filter: FilterArguments = new FilterArguments();

  constructor( private http: CisHttpService, private filterService: TodoFilterService) {
        this.$changeListener = this.$subject.asObservable();
  }

    private resp( m: MultiTodoResponse ){
      if ( !m ){
          this.response = {
              list : [],
              inCategories : { default : [] },
              categories : [],
              overdue : []
          };
      } else {
          this.response = m;
          this.viewList = this.response.list ? this.response.list : [];
          if( this.response && this.response.categories ){
              this.$categories = this.response.categories.map(s => FilterCategory.with(s));
          } else {
              this.$categories = [];
          }
          console.log('--categories');
          console.log( this.$categories );
      }
    }


  public loadAll( successCallback: ( m: MultiTodoResponse ) => void ){

    this.http.cisGet<MultiTodoResponse>( 'lists/todo/v1/all' )
        .subscribe( (resp) => {
            this.resp( resp.body );
            successCallback( this.response );
        });
  }

  public save( cmd: NewTodoCommand, successCallback: ( t: Todo ) => void ){
      this.http.cisPost<Todo>('lists/todo/v1/list' , cmd)
          .subscribe( (resp) => {
              this.response.list.push( resp.body );
              if( !this.response.categories.includes( resp.body.category ) ){
                  this.response.categories.push( resp.body.category );
              }

              this.resp( this.response );

              const event = new TodoResponseChanged();
              event.response = this.response;
              event.todoAdded = resp.body;


              this.$subject.next( event );
              successCallback( resp.body );
          });
  }

  public done( id: string, successCallback: () => void ){
      this.http.cisPut( 'lists/todo/v1/list/' + id + '/done' , undefined )
          .subscribe( (resp) => {
                this.response.list = this.response.list.filter( i => i.id !== id );
                this.resp(this.response);
                const event = new TodoResponseChanged();
                event.response = this.response;

                this.$subject.next( event );
                successCallback();
          });
  }

  public changeListener(): Observable<TodoResponseChanged> {
      return this.$changeListener;
  }

  get categories(){
      if ( this.$categories ){
          return this.$categories;
      } else {
          return [];
      }
  }

  get filteredViewList(): Array<Todo>{
      if ( !this.response || !this.response.list ) return [];
      return new TodoPipe().transform( this.response.list , this.filterService.filter );
  }

}
