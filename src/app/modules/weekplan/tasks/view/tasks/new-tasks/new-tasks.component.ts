import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppService} from "../../../../../../system/app.service";
import {environment} from "../../../../../../../environments/environment";

@Component({
  selector: 'app-new-tasks',
  templateUrl: './new-tasks.component.html',
  styleUrls: ['./new-tasks.component.css']
})
export class NewTasksComponent implements OnInit {

  public description = '';

  public file: File;

  constructor( private user: AppService, private http: HttpClient) { }

  ngOnInit() {
  }

  public fileSelect( event ){
    console.log(event['files']);
    this.file = event['files'][0];
  }

  public upload(){
    console.log('upload');
    console.log(this.file);
    const input = new FormData();
      input.append('file', this.file);
      input.append('description', this.description);

      const url = environment.cisHome.service + 'weekplan/tasks/task/new';

      this.http
        .put( url , input , {headers:this.user.createAuthHeader()} )
        .subscribe( (data) => {
            alert('sdlkjfdsklfjdslf');
        });
  }


}
