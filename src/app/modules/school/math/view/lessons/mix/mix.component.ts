import {Component, OnInit, ViewChild} from '@angular/core';
import {Aufgabe, AufgabenAggregate, Checker} from "../../../model/school";
import {CheckComponent} from "../check/check.component";
import {CisHttpService} from "../../../../../../system/cis-connector/services/cis-http.service";
import {AufgabenComponent} from "../aufgaben/aufgaben.component";
import {MathGenerator} from "../service/math-generator";

@Component({
  selector: 'app-mix',
  templateUrl: './mix.component.html',
  styleUrls: ['./mix.component.scss']
})
export class MixComponent extends Checker implements OnInit {

    public aufgabe: AufgabenAggregate;

    @ViewChild("checkc") component: CheckComponent;


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
      this.aufgabe = AufgabenAggregate.with('mix');
      console.log('aufgabe');
      console.log( this.aufgabe);
      if( this.aufgabe.isEmpty ){
          this.http.cisGet<Aufgabe[]>('school/math/mix?min=1&max=100&count=20').subscribe( (resp)=>{
              this.aufgabe = new AufgabenAggregate(resp.body , 'mix');
          } , (e)=>{
              this.handleError();
          });
      }
  }



    check(){
        this.component.check();
        this.checked = true;
        this.component.wrongAnswers;
        const request = {
            'wrongAnswers' : this.component.wrongAnswers
        }
        console.log(request);
        this.http.cisPost<object>( 'school/math/answers/wrong' , request).subscribe( (data)=>{
            console.log('check send');
        });

    }

    private handleError(){
      let aufgaben = new Array<Aufgabe>();
        MathGenerator.plus(2,100 , 20).forEach( p=>aufgaben.push(p) );
        MathGenerator.mal(2,100 , 20).forEach( p=>aufgaben.push(p) );
        MathGenerator.divide(2,100 , 20).forEach( p=>aufgaben.push(p) );
        MathGenerator.minus(2,100 , 20).forEach( p=>aufgaben.push(p) );

        this.aufgabe = new AufgabenAggregate( aufgaben , 'mix');
    }

    get aufgaben(){
      return this.aufgabe?.aufgaben;
    }


}
