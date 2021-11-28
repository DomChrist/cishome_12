import { Component, OnInit } from '@angular/core';
import {environment} from "../../../../../../../environments/environment";
import {CisHttpService} from "../../../../../../system/cis-connector/services/cis-http.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-list-dashboard',
  templateUrl: './list-dashboard.component.html',
  styleUrls: ['./list-dashboard.component.css']
})
export class ListDashboardComponent implements OnInit {

  public data: Array<ListProjection>;
  public newListDialogVisible = false;

  constructor( private httpClient: CisHttpService, private router: Router) { }

  ngOnInit() {
    this.load();
  }

  private load(){
    const uri = 'list/query/all';
    this.httpClient.cisGet<Array<ListProjection>>( uri  ).subscribe( data=>{
        this.data = data.body;
    });
  }

  public handleNewReference( event ){
    this.newListDialogVisible = false;
    this.load();
  }

  public open( p:ListProjection ){
      const route = [
          'app/lists',
          p.type.toLowerCase(),
          p.id
      ];
      console.log(route);
      this.router.navigate(route);
  }

}

interface ListProjection {
  id: string;
  name: string;
  type: string;
  creator: string;
  creatorGroup: string;
}
