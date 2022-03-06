import {Component, OnInit, ViewChild} from '@angular/core';
import {Aufgabe, Checker} from "../../../model/school";
import {CisHttpService} from "../../../../../../system/cis-connector/services/cis-http.service";
import {CheckComponent} from "../check/check.component";

@Component({
  selector: 'app-geteilt',
  templateUrl: './geteilt.component.html',
  styleUrls: ['./geteilt.component.scss']
})
export class GeteiltComponent extends Checker implements OnInit {
    public aufgaben: Aufgabe[];
    @ViewChild("checkc") component: CheckComponent;


    constructor( private http: CisHttpService) { super() }

  ngOnInit(): void {
      this.http.cisGet<Aufgabe[]>('school/math/geteilt?min=1&max=100&count=20').subscribe( (resp)=>{
          this.aufgaben = resp.body;
      });
  }

    check() {
        this.component.check();
        this.checked = true;
    }

}
