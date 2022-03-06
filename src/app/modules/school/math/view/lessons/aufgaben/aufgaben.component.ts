import {Component, Input, OnInit} from '@angular/core';
import {Aufgabe} from "../../../model/school";

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

}
