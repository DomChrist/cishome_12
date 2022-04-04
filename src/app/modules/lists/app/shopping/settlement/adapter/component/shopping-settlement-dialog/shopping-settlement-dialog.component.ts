import {Component, Input, OnInit} from '@angular/core';
import {StoreId} from "../../../../shoppingstores/domain/store-model";
import {ShoppingItem} from "../../../../shoppinglist/domain/shopping-model";
import {Settlement, SettlementItem} from "../../../domain/model";

@Component({
  selector: 'app-shopping-settlement-dialog',
  templateUrl: './shopping-settlement-dialog.component.html',
  styleUrls: ['./shopping-settlement-dialog.component.scss']
})
export class ShoppingSettlementDialogComponent implements OnInit {

  constructor() { }

  private _storeId: StoreId;
  private _list: Array<ShoppingItem>;
  private _model: Settlement;

  private _sum: string = '0,00';
  public input: number;

  ngOnInit(): void {
      this._model = Settlement.withShoppingItems(this._storeId , this._list);
      console.log( 'model' );
      console.log( this._model );
  }

  @Input()
  set store( s:string ){
      this._storeId = {
          id : s
      }
  }

  @Input()
  set shoppingList( list:Array<ShoppingItem> ){
      console.log(' list items =  ' + list.length);
      this._list = list;
  }


    get model(): Settlement {
        return this._model;
    }


    get sum(): string {
        return this._sum;
    }

    set sum(value: string) {
        this._sum = value;
    }

    handle(event: KeyboardEvent) {
        let number = Number(event.key);
        if( Number.isNaN(number) ){
            if( event.key === 'Backspace' ){
                this.input = Math.floor( this.input / 10 );
            }
        } else if( !this.input || this.input <= 0 ){
            this.input = Number(event.key);
        } else {
            let nNumber = Number( String(this.input) + event.key );
            this.input = nNumber;
        }
        this.inputToSum();
    }

    private inputToSum(){
        let number = this.input / 100;
        if( Number.isNaN(number) ){
            this._sum = "0,00";
        } else {
            this._sum = String(number).replace(".",",");
        }
    }

}
