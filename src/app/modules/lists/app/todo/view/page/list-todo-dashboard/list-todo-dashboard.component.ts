import {Component, OnInit, ViewChild} from '@angular/core';
import {TodoListServiceService} from '../../../application/todo-list-service.service';
import {MultiTodoResponse, Todo} from '../../../model/todo-model';
import {CreateNewTodoDialogComponent} from "../../component/create-new-todo-dialog/create-new-todo-dialog.component";
import {TodoResponseChanged} from "../../../model/todo-events";

@Component({
  selector: 'app-list-todo-dashboard',
  templateUrl: './list-todo-dashboard.component.html',
  styleUrls: ['./list-todo-dashboard.component.css']
})
export class ListTodoDashboardComponent implements OnInit {

  public sm: boolean;

  public showDialog = false;
  public showFilter = false;
  public response: MultiTodoResponse;
  public list: Array<Todo>;

  public filterActive = false;

  @ViewChild('createDialog')
  public dialog: CreateNewTodoDialogComponent;


    public buttons = [
        {
            tooltip: 'Add',
            icon: 'pi pi-pencil',
            command: () => {
                this.showDialog = true;
                this.dialog.visible = true;
                //this.messageService.add({ severity: 'info', summary: 'Add', detail: 'Data Added' });
            }
        },
        {
            tooltip: 'Update',
            icon: 'pi pi-filter',
            command: () => {
                this.showFilter = !this.showFilter;
                // this.messageService.add({ severity: 'success', summary: 'Update', detail: 'Data Updated' });
            }
        },
        {
            tooltip: 'Delete',
            icon: 'pi pi-trash',
            command: () => {
                // this.messageService.add({ severity: 'error', summary: 'Delete', detail: 'Data Deleted' });
            }
        },
        {
            tooltip: 'Upload',
            icon: 'pi pi-upload',
            routerLink: ['/fileupload']
        },
        {
            tooltip: 'Angular Website',
            icon: 'pi pi-external-link',
            url: 'http://angular.io'
        }
    ];

  constructor( private $service: TodoListServiceService) { }

  ngOnInit(): void {
      this.sm = window.innerWidth < 600;
      this.$service.loadAll( (resp) => {
          this.response = resp;
          this.list = this.response.list;
          this.$service.changeListener().subscribe( (m: TodoResponseChanged) => {
             this.response = m.response;
             this.list = this.response.list;
          });
      });
  }

  public clearFilter(){
      this.list = this.response.list;
      this.filterActive = false;
  }

  public todayFilter(){
      this.list = this.response.list
          .filter( f => f.filter.today );
      this.filterActive = true;
  }

    public currentWeek(){
        this.list = this.response.list
            .filter( f => f.filter.currentWeek );
        this.filterActive = true;
    }

    public nextWeek(){
        this.list = this.response.list
            .filter( f => f.filter.nextWeek );
        this.filterActive = true;
    }


    done(id: string) {
        this.$service.done(id , () => {});
    }
}
