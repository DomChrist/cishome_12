import {Component, OnInit, ViewChild} from '@angular/core';
import {CisHttpService} from "../../../../../../system/cis-connector/services/cis-http.service";
import {Aufgabe, Checker} from "../../../model/school";
import {CheckComponent} from "../check/check.component";

@Component({
  selector: 'app-plus',
  templateUrl: './plus.component.html',
  styleUrls: ['./plus.component.scss']
})
export class PlusComponent extends Checker implements OnInit {

  public aufgaben: Aufgabe[];

  public richtig: number;
  public falsch: number;

  @ViewChild("checkc") component: CheckComponent;

  constructor(private http:CisHttpService) { super() }

  ngOnInit(): void {
      this.http.cisGet<Aufgabe[]>('school/math/plus?maxsum=100&count=20').subscribe( (resp)=>{
        this.aufgaben = resp.body;
      });
  }

  public check(){
        this.checked = true;
        this.component.check();
  }

}
