import {Component, Input, OnInit} from '@angular/core';
import {ShoppingStoreService} from "../../../application/shopping-store.service";
import {Store, StoreAggregate} from "../../../domain/store-model";

@Component({
  selector: 'app-store-label',
  templateUrl: './store-label.component.html',
  styleUrls: ['./store-label.component.scss']
})
export class StoreLabelComponent implements OnInit {

  constructor( private storeService: ShoppingStoreService) { }

  private $storeId: string;
  public store: Store;
  public isStore = false;

  ngOnInit(): void {


  }

    imagePath() {
        if( this.isStore ){
            return "/assets/lists/shopping/stores/" + this.store.name.key + ".svg";
        } else {
            return "/assets/icons/flaticon/supermarkt.png";
        }
    }

    @Input()
    set storeId( id:string ){
      if( id ){
          this.$storeId = id;
          this.storeService.stores( (a)=>{
              let filter = a.filter(a=>a.store.storeId.id === this.$storeId );
              console.log(filter);
              if( filter && filter.length != 0){
                  this.store = filter[0].store;
                  this.isStore = true;
              }
              console.log('store')
              console.log( this.store );
          });
      }
    }

}
