import {Component, Input, OnInit} from '@angular/core';
import {Aufgabe} from "../../../model/school";

@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.scss']
})
export class CheckComponent implements OnInit {

  private $aufgaben: Aufgabe[];
  private $richtig: number;
  private $falsch: number;
  private $checked = false;

  private $wrongAnswers: Aufgabe[];
  private $rightAnswers: Aufgabe[];

  constructor() { }

  ngOnInit(): void {
  }

  @Input()
  set aufgaben(aufgaben:Aufgabe[]){
        this.$aufgaben = aufgaben;
  }

  get aufgaben(){
      return this.$aufgaben;
  }

  public check(){
      this.$richtig = 0;
      this.$falsch = 0;
      this.$wrongAnswers = new Array<Aufgabe>();
      for( let a of this.$aufgaben ){
          console.log( a.input + "===" + a.result );
          if( !a.input ){
              a.check = 0;
          } else if( a.input === a.result ){
              a.check = 1;
              this.$rightAnswers.push( a );
              this.$richtig++;
          } else {
              this.$falsch++;
              a.check = -1;
              this.$wrongAnswers.push( a );
          }
      }
      this.$checked = true;
  }

  get richtig(){
      return this.$richtig;
  }

  get falsch(){
      return this.$falsch;
  }

  get wrongAnswers(){
    return this.$wrongAnswers;
  }

  get rightAnswers(){
      return this.$rightAnswers;
  }

}
