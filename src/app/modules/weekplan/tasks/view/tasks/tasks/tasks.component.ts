import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../../../environments/environment";
import { Task } from '../../../model/task';
import {AppService} from "../../../../../../system/app.service";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  constructor( private user: AppService, private http: HttpClient) { }
  public tasks:Array<Task>;

  ngOnInit() {
    this.load();
  }

  private load(){
      let url = environment.cisHome.service + 'weekplan/tasks';
      this.http.get<Array<Task>>( url , {headers:this.user.createAuthHeader()} ).subscribe( (data)=>{
        console.log(data);
        this.tasks = data;
      });
  }

  public deleteTask( id ){
    let url = environment.cisHome.service + 'weekplan/tasks/task/delete/'+id;
    this.http.delete( url , {headers:this.user.createAuthHeader()} )
      .subscribe( (data) => {
          this.load();
      });
  }


}
