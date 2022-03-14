import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Aufgabe, AufgabenAggregate, Checker} from "../../../model/school";
import {CisHttpService} from "../../../../../../system/cis-connector/services/cis-http.service";
import {CheckComponent} from "../check/check.component";
import {MathGenerator} from "../service/math-generator";

@Component({
  selector: 'app-mal',
  templateUrl: './mal.component.html',
  styleUrls: ['./mal.component.scss']
})
export class MalComponent extends Checker implements OnInit {
    public aufgaben: Aufgabe[];
    public aufgabe: AufgabenAggregate;
    @ViewChild("checkc") component: CheckComponent;

    @Input()
    public count: number = 20;


    constructor(private http: CisHttpService) { super() }

  ngOnInit(): void {
        this.$loadAggregate();
  }

    private $loadAggregate(){
        this.aufgabe = AufgabenAggregate.with('mal');
        console.log('aufgabe');
        console.log( this.aufgabe);
        if( this.aufgabe.isEmpty ){
            this.http.cisGet<Aufgabe[]>('school/math/mal?min=1&max=100&count='+this.count).subscribe( (resp)=>{
                this.aufgaben = resp.body;
                this.aufgabe = new AufgabenAggregate(resp.body , 'mal');
            } , (e)=>{
                this.aufgabe = new AufgabenAggregate(MathGenerator.mal( 2,10,this.count ),'mal');
            });
        }
    }

    reload(){
        this.aufgabe.clear();
        this.checked = false;
        this.$loadAggregate();
    }

    check() {
        this.component.check();
        this.checked = true;
    }

}
