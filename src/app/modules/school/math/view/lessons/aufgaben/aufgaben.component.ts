import {Component, Input, OnInit} from '@angular/core';
import {Aufgabe, AufgabenAggregate, TeilAufgabe} from "../../../model/school";

@Component({
  selector: 'app-aufgaben',
  templateUrl: './aufgaben.component.html',
  styleUrls: ['./aufgaben.component.scss']
})
export class AufgabenComponent implements OnInit {

  private $aufgabe: AufgabenAggregate;

  constructor() { }

  ngOnInit(): void {
  }

  @Input()
  set aufgabe( a:AufgabenAggregate ){
      this.$aufgabe = a;
      console.log(this.$aufgabe);
  }

  get aufgaben(){
      return this.$aufgabe.aufgaben;
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

    activateHelp( a:Aufgabe ){
      a.help = !a.help;
      a.helpCounter++;
    }

    blur($event: FocusEvent) {
      console.log(this.$aufgabe);
        if( this.$aufgabe ) this.$aufgabe.store();
    }
}
