import {Component, Input, OnInit} from '@angular/core';
import {Aufgabe, TeilAufgabe} from "../../../model/school";

@Component({
  selector: 'app-aufgaben',
  templateUrl: './aufgaben.component.html',
  styleUrls: ['./aufgaben.component.scss']
})
export class AufgabenComponent implements OnInit {

  private $aufgaben: Aufgabe[];

  constructor() { }

  ngOnInit(): void {
  }

  @Input()
  set aufgaben( aufgaben:Aufgabe[] ){
        this.$aufgaben = aufgaben;
  }

  get aufgaben(){
      return this.$aufgaben;
  }

  public getCorrectSplits( aufgabe:Aufgabe ){
      console.log('----------------------');
      let t = new Array<TeilAufgabe>();
      let nextStop = false;
      for( let i of aufgabe.split ){
          if( nextStop ) break;
          console.log(i);
          console.log(i.result)
          console.log(i.input)
          console.log( i.result == i.input );
          if( i.result != i.input ) nextStop=true;
          console.log('correct');
          t.push(i);
      }
    return t;
  }

    splitCheck(a: Aufgabe, s: TeilAufgabe) {
        if( s.input === s.result && s.input === a.result ){
            a.input = s.input;
            a.help = false;
        }
    }
}
