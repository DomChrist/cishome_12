import { Component, OnInit } from '@angular/core';
import {CisHttpService} from "../../../../../system/cis-connector/services/cis-http.service";

@Component({
  selector: 'app-math-dashboard',
  templateUrl: './math-dashboard.component.html',
  styleUrls: ['./math-dashboard.component.scss']
})
export class MathDashboardComponent implements OnInit {

  public aufgaben: Aufgabe[];

  constructor( private http:CisHttpService) { }

  ngOnInit(): void {
      this.aufgaben = [
          {name:"+",path:"plus"},
          {name:"-" , path:"minus"},
          {name:"*", path:"mal"},
          {name:":" , path:"geteilt"},
          {name:"MIX" , path:"mix"}
      ];
  }





}



interface Aufgabe{
    name: string;
    path: string;
}
