import {Component, OnInit, ViewChild} from '@angular/core';
import {TodoListService} from '../../../application/todo-list.service';
import {Filter, FilterCategory, MultiTodoResponse, Todo} from '../../../model/todo-model';
import {CreateNewTodoDialogComponent} from '../../component/create-new-todo-dialog/create-new-todo-dialog.component';
import {TodoResponseChanged} from '../../../model/todo-events';
import {FilterArguments, TodoPipe} from '../todo.pipe';
import {TodoFilterService} from "../../../application/todo-filter.service";

@Component({
  selector: 'app-list-todo-dashboard',
  templateUrl: './list-todo-dashboard.component.html',
  styleUrls: ['./list-todo-dashboard.component.css']
})
export class ListTodoDashboardComponent implements OnInit {

  public showDialog = false;
  public showFilter = false;
  public response: MultiTodoResponse;
  public list: Array<Todo>;
  public categories: Array<FilterCategory>;

  public filterActive = false;
  public filter = new FilterArguments();

  @ViewChild('createDialog')
  public dialog: CreateNewTodoDialogComponent;


    public buttons = [
        {
            tooltip: 'Add',
            icon: 'pi pi-pencil',
            command: () => {
                this.showDialog = true;
                this.dialog.visible = true;
            }
        },
        {
            tooltip: 'Filter',
            icon: 'pi pi-filter',
            command: () => {
                this.showFilter = !this.showFilter;
            }
        }
    ];

  constructor( private $service: TodoListService,
               private $filterService: TodoFilterService) { }

  ngOnInit(): void {
      this.$service.loadAll( (resp) => {
          this.resp( resp );
          this.$service.changeListener().subscribe( (m: TodoResponseChanged) => {
              this.filter = new FilterArguments();
              this.resp(m.response);
          });
      });
  }

  public resp( m: MultiTodoResponse ){
      this.response = m;
      this.categories = this.$service.categories;
      this.filter.activeCategories = this.$service.categories.map(c => c.name );
      this.list = this.$service.viewList;
      console.log('---list');
      console.log(this.list);
  }

  public clearFilter(){
      this.filter.clearDaysFilter();
      this.list = this.filter.list( this.response.list );
  }

  public todayFilter(){
      this.$filterService.todayFilter();
      this.list = this.filter.list( this.response.list );
  }

    public currentWeek(){
        this.filter.currentWeekActive = true;
        this.list = this.filter.list( this.response.list );
    }

    public nextWeek(){
      this.filter.nextWeekActive = true;
      this.list = this.filter.list( this.response.list );
    }


    done(id: string) {
        this.$service.done(id , () => {});
    }

    dateFilter($event: Date) {
        if ( this.response && this.response.list ){
            this.list = this.response.list.filter( d => {
                if ( d.due ){
                    console.log(d.due);
                    console.log($event);
                    const $d = new Date(d.due);
                    return $d.getDate() === $event.getDate();
                }
                return false;
            });
            this.filterActive = true;
        }
    }

    categoryFilter(event, cat: FilterCategory){
      cat.active = event.checked;
      this.filter.activeCategories = this.categories.filter( c => c.active ).map( c => c.name );
      this.list = this.filter.list( this.response.list );
    }

    get viewList(){
      return this.$service.viewList;
    }

    get allCategories(){
      return this.$service.categories;
    }

    get filteredViewList(){
      return this.$service.filteredViewList;
    }


}


