import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-school-dashboard',
  templateUrl: './school-dashboard.component.html',
  styleUrls: ['./school-dashboard.component.scss']
})
export class SchoolDashboardComponent implements OnInit {

    public aufgaben: Aufgabe[];

    constructor() { }

  ngOnInit(): void {
      this.aufgaben = [
          {name:"+",path:"math/plus"},
          {name:"-" , path:"math/minus"},
          {name:"*", path:"math/mal"},
          {name:":" , path:"math/geteilt"},
          {name:"MIX" , path:"math/mix"},
          {name:"SPEED" , path:"math/speed"}
      ];
  }

}

interface Aufgabe{
    name: string;
    path: string;
}
