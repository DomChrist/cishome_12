import { Component, OnInit } from '@angular/core';
import {TeamMember} from '../../model/team';
import {CisHttpService} from '../../../../../system/cis-connector/services/cis-http.service';
import {CisAuthService} from '../../../../../system/cis-connector/services/cis-auth-service';

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

  constructor( private user: CisAuthService, private http: CisHttpService) { }


  ngOnInit() {
    this.load();
  }

  private load(){
    this.http.cisGet<Array<TeamMember>>( 'weekplan/team'  ).subscribe( data => {
        this.team = data.body;
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

    const url = 'weekplan/team/new/member';

    this.http
      .cisPut( url , input )
      .subscribe( (data) => {
        this.load();
      });
  }

}
