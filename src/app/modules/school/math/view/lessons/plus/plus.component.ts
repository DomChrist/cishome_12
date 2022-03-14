import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {CisHttpService} from "../../../../../../system/cis-connector/services/cis-http.service";
import {Aufgabe, AufgabenAggregate, Checker} from "../../../model/school";
import {CheckComponent} from "../check/check.component";
import {MathGenerator} from "../service/math-generator";

@Component({
  selector: 'app-plus',
  templateUrl: './plus.component.html',
  styleUrls: ['./plus.component.scss']
})
export class PlusComponent extends Checker implements OnInit {

  public aufgaben: Aufgabe[];
  public aufgabe: AufgabenAggregate;

  public richtig: number;
  public falsch: number;

  @Input()
  public count: number = 20;

  @ViewChild("checkc") component: CheckComponent;

  constructor(private http:CisHttpService) { super() }

  ngOnInit(): void {
    this.$loadAggregate();
  }

    reload(){
        this.aufgabe.clear();
        this.checked = false;
        this.$loadAggregate();
    }

    private $loadAggregate(){
        this.aufgabe = AufgabenAggregate.with('plus');
        console.log('aufgabe');
        console.log( this.aufgabe);
        if( this.aufgabe.isEmpty ){
            this.http.cisGet<Aufgabe[]>('school/math/plus?maxsum=100&count='+this.count).subscribe( (resp)=>{
                this.aufgabe = new AufgabenAggregate(resp.body , 'mix');
            } , (e)=>{
                this.handleError();
            });
        }
    }

    private handleError() {
        this.aufgabe = new AufgabenAggregate( MathGenerator.plus(1,100,20) , 'plus' );
    }

  public check(){
        this.checked = true;
        this.component.check();
  }


}
