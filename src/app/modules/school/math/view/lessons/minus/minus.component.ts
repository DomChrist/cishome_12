import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Aufgabe, AufgabenAggregate, Checker} from "../../../model/school";
import {CisHttpService} from "../../../../../../system/cis-connector/services/cis-http.service";
import {CheckComponent} from "../check/check.component";
import {MathGenerator} from "../service/math-generator";

@Component({
  selector: 'app-minus',
  templateUrl: './minus.component.html',
  styleUrls: ['./minus.component.scss']
})
export class MinusComponent extends Checker implements OnInit {

    public aufgaben: Aufgabe[];
    public aufgabe: AufgabenAggregate;

    @ViewChild('checkc') component: CheckComponent;

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
        this.aufgabe = AufgabenAggregate.with('minus');
        console.log('aufgabe');
        console.log( this.aufgabe);
        if( this.aufgabe.isEmpty ){
            this.http.cisGet<Aufgabe[]>('school/math/minus?min=1&max=100&count='+this.count).subscribe( (resp)=>{
                this.aufgabe = new AufgabenAggregate(resp.body , 'minus');
            } , (e)=>{
                this.handleError();
            });
        }
    }

    private handleError(){
      this.aufgabe = new AufgabenAggregate( MathGenerator.minus(1,100 , 20) , 'minus' );
    }

    public check(){
        this.checked = true;
        this.component.check();

        this.component.wrongAnswers;
        const request = {
            'wrongAnswers' : this.component.wrongAnswers
        }
        console.log(request);
        this.http.cisPost<object>( 'school/math/answers/wrong' , request).subscribe( (data)=>{
            console.log('check send');
        });

    }

}
