import { Component, OnInit } from '@angular/core';
import {CisHttpService} from '../../../../../../system/cis-connector/services/cis-http.service';
import {CisAuthService} from '../../../../../../system/cis-connector/services/cis-auth-service';
import {environment} from '../../../../../../../environments/environment';

@Component({
  selector: 'app-new-tasks',
  templateUrl: './new-tasks.component.html',
  styleUrls: ['./new-tasks.component.css']
})
export class NewTasksComponent implements OnInit {

  public description = '';

  public file: File;

  constructor( private user: CisAuthService, private http: CisHttpService) { }

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

      const url = 'weekplan/tasks/task/new';

      this.http
        .cisPut( url , input )
        .subscribe( (data) => {
            alert('sdlkjfdsklfjdslf');
        });
  }


}
