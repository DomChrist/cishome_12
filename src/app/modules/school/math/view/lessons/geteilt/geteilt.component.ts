import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Aufgabe, AufgabenAggregate, Checker} from "../../../model/school";
import {CisHttpService} from "../../../../../../system/cis-connector/services/cis-http.service";
import {CheckComponent} from "../check/check.component";
import {MathGenerator} from "../service/math-generator";

@Component({
  selector: 'app-geteilt',
  templateUrl: './geteilt.component.html',
  styleUrls: ['./geteilt.component.scss']
})
export class GeteiltComponent extends Checker implements OnInit {
    public aufgaben: Aufgabe[];
    public aufgabe: AufgabenAggregate;
    @ViewChild("checkc") component: CheckComponent;

    @Input()
    public count: number = 20;


    constructor( private http: CisHttpService) { super() }

  ngOnInit(): void {
        this.$loadAggregate();
  }

    reload(){
        this.aufgabe.clear();
        this.checked = false;
        this.$loadAggregate();
    }

    private $loadAggregate(){
        this.aufgabe = AufgabenAggregate.with('geteilt');
        console.log('aufgabe');
        console.log( this.aufgabe);
        if( this.aufgabe.isEmpty ){
            this.http.cisGet<Aufgabe[]>('school/math/geteilt?min=1&max=100&count='+this.count).subscribe( (resp)=>{
                this.aufgabe = new AufgabenAggregate(resp.body,'geteilt');
            } , (e)=>{
                this.aufgabe = new AufgabenAggregate(MathGenerator.divide(1,10,this.count),'geteilt');
            });
        }
    }

    check() {
        this.component.check();
        this.checked = true;
    }

}
