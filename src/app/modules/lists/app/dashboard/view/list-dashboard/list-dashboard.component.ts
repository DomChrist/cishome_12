import {Component, OnInit} from '@angular/core';
import {CisHttpService} from "../../../../../../system/cis-connector/services/cis-http.service";
import {Router} from "@angular/router";
import {READY_STATE} from "../../../../../../pages/dashboard/cis-dashboard/cis-dashboard.component";

@Component({
  selector: 'app-list-dashboard',
  templateUrl: './list-dashboard.component.html',
  styleUrls: ['./list-dashboard.component.css']
})
export class ListDashboardComponent implements OnInit {

  public httpState: READY_STATE;

  public data: Array<ListProjection>;
  public newListDialogVisible = false;

  constructor( private httpClient: CisHttpService, private router: Router) { }

  ngOnInit() {
    this.load();
  }

  private load(){
    const uri = 'list/query/all';
    this.httpState = READY_STATE.PENDING;
    this.httpClient.cisGet<Array<ListProjection>>( uri  ).subscribe( data=>{
        this.data = data.body;
        this.httpState = READY_STATE.YES;
    } , (error => {
        this.httpState = READY_STATE.ERROR;
    }));
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

  get isPending(): boolean{
      if( this.httpState === READY_STATE.PENDING ) return true;
      return false;
  }

}

interface ListProjection {
  id: string;
  name: string;
  type: string;
  creator: string;
  creatorGroup: string;
}
