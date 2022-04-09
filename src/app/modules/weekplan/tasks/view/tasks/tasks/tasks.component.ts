import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../../../environments/environment';
import { Task } from '../../../model/task';
import {CisHttpService} from '../../../../../../system/cis-connector/services/cis-http.service';
import {DomSanitizer} from '@angular/platform-browser';
import {TaskService} from "../../../application/task.service";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  constructor( private taskService: TaskService) { }
  public tasks: Array<Task>;

  ngOnInit() {
    this.load();
  }

  private load(){
      this.taskService.loadTasks( ( t: Array<Task>) => {
        this.tasks = t;
      });
  }

  public deleteTask( id ){
      /*
    const url = 'weekplan/tasks/task/delete/' + id;
    this.http.cisDelete( url  )
      .subscribe( (data) => {
          this.load();
      });
       */
  }


}
