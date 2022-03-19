import {Component, Input, OnInit} from '@angular/core';
import {Item, ListAggregate} from "../../../../domain/list-model";
import {ListService} from "../../../../application/list.service";
import {Location} from "@angular/common";
import {ShoppingListService} from "../../../services/shopping-list.service";
import {ActivatedRoute} from "@angular/router";
import {ShoppingItem, ShoppingModel} from "../../../shoppinglist/domain/shopping-model";
import {ShoppingStoreService} from "../../../shoppingstores/application/shopping-store.service";
import {Store, StoreAggregate} from "../../../shoppingstores/domain/store-model";

@Component({
  selector: 'app-shopping-list-view',
  templateUrl: './shopping-list-view.component.html',
  styleUrls: ['./shopping-list-view.component.scss']
})
export class ShoppingListViewComponent implements OnInit {

    public listReference: string;

    public listAggregate: ListAggregate;

    public inputStep = 0;

    public newItemView = false;
    public newStoreView = false;

    public model: ShoppingModel;
    public selectedItem: ShoppingItem;

    public stores: StoreAggregate[];

    constructor( private storeService: ShoppingStoreService, private service: ListService , private shoppingService: ShoppingListService, private route: ActivatedRoute, private location: Location) { }

  ngOnInit(){
      this.route.paramMap.subscribe( map=>{
          this.shoppingService.list( map.get('id') , (model:ShoppingModel)=>{
              this.model = model;
          });
      });
      this.storeService.stores( (aggregates => {
        this.stores = aggregates;
      }) , () => {} );
      //this.shoppingService.shoppingStream.subscribe( (m)=>this.model = m );
  }

    set list( l: ListAggregate ){
        this.listReference = l.id.id;
        this.listAggregate = l;
    }

    get list(): ListAggregate{
        return this.listAggregate;
    }

    public back(){
        this.location.back();
    }

    public load(){
        this.shoppingService.open( this.model.id );
    }

    public bought( item: Item){
        item.hidden = true;
        this.shoppingService.bought( this.model.id , item );
    }

    public finish() {
        this.service.finish(this.listAggregate.id.id);
    }

    public removeItem( item: Item){
        this.shoppingService.remove( this.model.id , item.id , (m:ShoppingModel) => {
            this.model = m;
        });
    }

    @Input()
    set reference( r: string ){
        this.listReference = r;
    }

    get reference(): string {
        return this.listReference;
    }


    addStore($event: Store) {
        if( $event ){
            if( !this.model.storeGroupedList[$event.storeId.id] ){
                this.model.storeGroupedList[$event.storeId.id]  = new Array<ShoppingItem>();
                console.log(this.model.storeGroupedList);
                this.newStoreView = false;
            }
        }
    }
}
