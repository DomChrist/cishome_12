import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {by} from "protractor";

@Component({
  selector: 'app-shopping-item-list-view',
  templateUrl: './shopping-item-list-view.component.html',
  styleUrls: ['./shopping-item-list-view.component.scss']
})
export class ShoppingItemListViewComponent implements OnInit {

  private $list = new Array<Item>();

  @ViewChild("listinput")
  public input: ElementRef;

  @ViewChild("listElement") public listElement: ElementRef;

  constructor() { }

  ngOnInit(): void {
      this.$list = new Array<Item>();
        this.$list.push( {
            'id' : undefined,
            'i' : -1,
            'value' : null,
            'insert' : true
        } );
  }

  public id( i:Item): string{
      return "item-" + i.id;
  }

  public keyListener( event:KeyboardEvent , item:Item ){
    console.log(event);
    console.log(item.value);
    if( item.value && item.value.trim().length > 1 ){
        if( item.i == -1 ){
            item.insert = false;
            item.i = this.list.length + 1;
            item.id = 'item-' + item.i;
        }
    }



  }

  get list(){
      if( this.$list.filter( i=>i.insert == true ).length == 0 ){
          this.$list.push( {
              'id' : undefined,
              'i' : -1,
              'value' : null,
              'insert' : true
          });
      }
      return this.$list;
  }

}


export interface Item {
    id:string;
    i:number;
    value:string;
    insert: boolean;
}
