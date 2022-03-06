import {Component, OnInit, ViewChild} from '@angular/core';
import {Aufgabe, Checker} from "../../../model/school";
import {CheckComponent} from "../check/check.component";
import {CisHttpService} from "../../../../../../system/cis-connector/services/cis-http.service";

@Component({
  selector: 'app-mix',
  templateUrl: './mix.component.html',
  styleUrls: ['./mix.component.scss']
})
export class MixComponent extends Checker implements OnInit {

    public aufgaben: Aufgabe[];

    @ViewChild("checkc") component: CheckComponent;

  constructor( private http: CisHttpService) { super() }

  ngOnInit(): void {
      this.http.cisGet<Aufgabe[]>('school/math/mix?min=1&max=100&count=20').subscribe( (resp)=>{
          this.aufgaben = resp.body;
      });
  }

    check() {
      this.checked = true;
      this.component.check();
    }

}
