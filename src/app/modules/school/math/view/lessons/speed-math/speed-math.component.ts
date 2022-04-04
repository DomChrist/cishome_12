import { Component, OnInit } from '@angular/core';
import {Aufgabe} from "../../../model/school";
import {MathGenerator} from "../service/math-generator";

@Component({
  selector: 'app-speed-math',
  templateUrl: './speed-math.component.html',
  styleUrls: ['./speed-math.component.scss']
})
export class SpeedMathComponent implements OnInit {

  private $start:Date;
  private $stop:Date;
  public aufgabe: Aufgabe;

  public right: Array<Aufgabe>;
  public wrong: Array<Aufgabe>;

  public max = 20;
  public counter = 0;

  constructor() { }

  ngOnInit(): void {
  }

  public start(){
        this.$start = new Date();
        this.right = new Array<Aufgabe>();
        this.wrong = new Array<Aufgabe>();
        this.counter = 0;
        this.aufgabe = this.$aufgabe();
  }

  public next(){
      console.log('counter ' + this.counter);
        if( this.isRight(this.aufgabe) ){
            this.right.push(this.aufgabe);
        } else {
            this.wrong.push(this.aufgabe);
        }

        if( this.counter >= 20 ){
            this.$stop = new Date();
        } else {
            this.aufgabe = undefined;
            this.aufgabe = this.$aufgabe();
        }
    this.counter++;

  }

  private isRight( a:Aufgabe ): boolean{
      if( !a.input ) return false;
      if( a.input == a.result ) return true;
      return false;
  }

  private $aufgabe(): Aufgabe{
      let number = MathGenerator.random(0,100000);
      const d = number % 4;
      console.log(d);
      switch (d) {
          case 1:
              return MathGenerator.minus(1,100,1)[0];
          case 2:
              return MathGenerator.mal(1,10,1)[0];
          case 3:
              return MathGenerator.divide(1,10,1)[0];
          default:
              return MathGenerator.plus(1,100,1)[0];

      }
  }



}
