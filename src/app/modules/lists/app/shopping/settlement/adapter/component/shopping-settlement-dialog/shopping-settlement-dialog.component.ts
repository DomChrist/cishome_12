import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {StoreId} from '../../../../shoppingstores/domain/store-model';
import {ShoppingItem} from '../../../../shoppinglist/domain/shopping-model';
import {Settlement, SettlementItem} from '../../../domain/model';
import {ShoppingListService} from '../../../../services/shopping-list.service';
import {Message} from 'primeng/api';

@Component({
  selector: 'app-shopping-settlement-dialog',
  templateUrl: './shopping-settlement-dialog.component.html',
  styleUrls: ['./shopping-settlement-dialog.component.scss']
})
export class ShoppingSettlementDialogComponent implements OnInit {

  constructor( private settlement: ShoppingListService ) { }

  private $storeId: StoreId;
  private $list: Array<ShoppingItem>;
  private $model: Settlement;

  private $sum = '0,00';
  public input: number;

  @Output() successSettlement = new EventEmitter<Message>();


    ngOnInit(): void {
      this.$model = Settlement.withShoppingItems(this.$storeId , this.$list);
      console.log( 'model' );
      console.log( this.$model );
  }

  public submit(){
      this.$model.sum = this.input / 100;
      this.settlement.openSettlement( this.$model , () => { this.successSettlement.emit({severity: 'success' , summary: 'Abrechnung erfolgreich erstellt', detail: 'Neue Abrechnung verfügbar'}); } );
  }

  @Input()
  set store( s: string ){
      this.$storeId = {
          id : s
      };
  }

  @Input()
  set shoppingList( list: Array<ShoppingItem> ){
      console.log(' list items =  ' + list.length);
      this.$list = list;
  }


    get model(): Settlement {
        return this.$model;
    }


    get sum(): string {
        return this.$sum;
    }

    set sum(value: string) {
        this.$sum = value;
    }

    handle(event: KeyboardEvent) {
        if ( event.key === 'Enter' ){
            this.submit();
            return;
        }

        const n = Number(event.key);
        if ( Number.isNaN(n) ){
            if ( event.key === 'Backspace' ){
                this.input = Math.floor( this.input / 10 );
            }
        } else if ( !this.input || this.input <= 0 ){
            this.input = Number(event.key);
        } else {
            const nNumber = Number( String(this.input) + event.key );
            this.input = nNumber;
        }
        this.inputToSum();
    }

    private inputToSum(){
        const n = this.input / 100;
        if ( Number.isNaN(n) ){
            this.$sum = '0,00';
        } else {
            this.$sum = String(n).replace('.', ',');
        }
    }

}
