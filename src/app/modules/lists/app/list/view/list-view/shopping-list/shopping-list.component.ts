import {Component, Input, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {ListService} from "../../../../application/list.service";
import {Item, ListAggregate} from "../../../../domain/list-model";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  private _reference: string;

  private _list: ListAggregate;

  public input_step = 0;

  public newItemView = false;

  constructor( private service:ListService , private location: Location) { }

  ngOnInit(): void {
      this._list = this.service.listAggregate;
      this.service.listStream.subscribe( d=>this.list = d )
  }

  set list( l:ListAggregate ){
      this._list = l;
  }

  get list(): ListAggregate{
      return this._list;
  }

  public back(){
      this.location.back();
  }

    public load(){
        this.service.load( this.reference );
    }

  public bought( item:Item){
    item.hidden = true;
    this.service.bought( this.reference , item );
  }

  public removeItem( item:Item){
      this.service.remove( this.reference , this.list , item );
  }

  @Input()
  set reference( r:string ){
      this._reference = r;
  }

  get reference(): string {
      return this._reference;
  }


}
