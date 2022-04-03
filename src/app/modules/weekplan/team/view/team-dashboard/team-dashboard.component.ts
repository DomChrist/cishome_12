import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../../environments/environment";
import {TeamMember} from "../../model/team";
import {AppService} from "../../../../../system/app.service";

@Component({
  selector: 'app-team-dashboard',
  templateUrl: './team-dashboard.component.html',
  styleUrls: ['./team-dashboard.component.css']
})
export class TeamDashboardComponent implements OnInit {

  public name = '';

  public file: File;

  public team: Array<TeamMember>;

  newMemberDialogVisible = false;

  constructor( private user: AppService, private http: HttpClient) { }


  ngOnInit() {
    this.load();
  }

  private load(){
    this.http.get<Array<TeamMember>>( environment.cisHome.service+'weekplan/team' , {headers:this.user.createAuthHeader()} ).subscribe( data => {
        this.team = data;
    });
  }

  public fileSelect( event ){
    console.log(event['files']);
    this.file = event['files'][0];
  }

  public save(){
    console.log('upload');
    console.log(this.file);
    const input = new FormData();
      input.append('file', this.file);
      input.append('name', this.name);

    const url = environment.cisHome.service + 'weekplan/team/new/member';

    this.http
      .put( url , input , {headers:this.user.createAuthHeader()} )
      .subscribe( (data) => {
        alert('sdlkjfdsklfjdslf');
        this.load();
      });
  }

}
