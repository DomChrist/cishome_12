import { Component, OnInit } from '@angular/core';
import {CisHttpService} from "../../../../../system/cis-connector/services/cis-http.service";

@Component({
  selector: 'app-math-dashboard',
  templateUrl: './math-dashboard.component.html',
  styleUrls: ['./math-dashboard.component.scss']
})
export class MathDashboardComponent implements OnInit {


  constructor( private http:CisHttpService) { }

  ngOnInit(): void {
  }





}



