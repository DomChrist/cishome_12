import {Component, Input, OnInit} from '@angular/core';
import {Item, ListAggregate} from "../../../../domain/list-model";
import {ListService} from "../../../../application/list.service";
import {Location} from "@angular/common";
import {ShoppingListService} from "../../../services/shopping-list.service";
import {ActivatedRoute} from "@angular/router";
import {ShoppingItem, ShoppingModel} from "../../../model/shopping-model";

@Component({
  selector: 'app-shopping-list-view',
  templateUrl: './shopping-list-view.component.html',
  styleUrls: ['./shopping-list-view.component.scss']
})
export class ShoppingListViewComponent implements OnInit {

    private listReference: string;

    private listAggregate: ListAggregate;

    public inputStep = 0;

    public newItemView = false;

    public model: ShoppingModel;
    public selectedItem: ShoppingItem;

    constructor( private service: ListService , private shoppingService: ShoppingListService, private route: ActivatedRoute, private location: Location) { }

  ngOnInit(){
      this.route.paramMap.subscribe( map=>{
         this.model = this.shoppingService.open(map.get('id'));
      });
      this.shoppingService.shoppingStream.subscribe( (m)=>this.model = m );
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
        this.shoppingService.remove( this.model.id, this.list , item , (m:ShoppingModel) => {
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


}
