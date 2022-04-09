import { Injectable } from '@angular/core';
import {CisHttpService} from '../../../../system/cis-connector/services/cis-http.service';
import {Task} from '../model/task';
import {DomSanitizer} from '@angular/platform-browser';
import {TaskUseCase} from './task-use-case';

@Injectable({
  providedIn: 'root'
})
export class TaskService implements TaskUseCase {

    private tasks: Array<Task>;

    constructor( private http: CisHttpService, private sanitizer: DomSanitizer) { }


  public loadTasks( success:( tasks: Array<Task>) => void ){
      if( this.tasks ){
            success(this.tasks);
            return;
      }
      const url = 'weekplan/tasks';
      this.http.cisGet<Array<Task>>( url ).subscribe( (data) => {
          console.log(data.body);
          data.body.forEach( t => {
              t.taskImage.safeUrl = this.sanitizer.bypassSecurityTrustUrl( t.taskImage.baseImage );
          });
          this.tasks = data.body;
          success( this.tasks);
      });
  }


}
