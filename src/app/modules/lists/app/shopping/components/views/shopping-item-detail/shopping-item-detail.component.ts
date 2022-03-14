import {Component, Input, OnInit} from '@angular/core';
import {ShoppingItem, ShoppingModel} from "../../../shoppinglist/domain/shopping-model";

@Component({
  selector: 'app-shopping-item-detail',
  templateUrl: './shopping-item-detail.component.html',
  styleUrls: ['./shopping-item-detail.component.scss']
})
export class ShoppingItemDetailComponent implements OnInit {

  constructor() { }

  public item: ShoppingItem;

  public counter = 0;

  ngOnInit(): void {
  }

    @Input()
    set shoppingItem( i:ShoppingItem ){
      if( i ){
          this.item = i;
          this.counter = i.counter;
      }
    }

    public plus(): void{
        this.counter++;
    }

    get counting(){
      if( this.counter ) return this.counter.toString();
      return '1';
    }

}
