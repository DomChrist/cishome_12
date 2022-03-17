import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {by} from "protractor";
import {ShoppingListService} from "../../../../services/shopping-list.service";
import {ShoppingItem} from "../../../domain/shopping-model";
import {List} from "../../../../../domain/list-model";

@Component({
  selector: 'app-shopping-item-list-view',
  templateUrl: './shopping-item-list-view.component.html',
  styleUrls: ['./shopping-item-list-view.component.scss']
})
export class ShoppingItemListViewComponent implements OnInit {

  private $list: Array<ShoppingItem>;
  private $open: Array<ShoppingItem>;
  private $done: Array<ShoppingItem>;
  private $shopId: StoreId;

  public inputElement: InputElement;
  public listHandler: ListHandler;

  @ViewChild("listinput")
  public input: ElementRef;

  @ViewChild("listElement") public listElement: ElementRef;

  constructor( private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
      this.inputElement = new InputElement( this.$shopId , this.shoppingListService );
      this.listHandler = new ListHandler(this.$list,this.$shopId);
  }

  public id( i:Item): string{
      return "item-" + i.id;
  }

  get list(){
      if( this.$list.filter( i=>i.insert == true ).length == 0 ){
          let item = new ShoppingItem();
              item.i = -1;
              item.id = "";
              item.identifier = this.storeId +"-input";
              item.name = null;
              item.insert = true;
              item.touched = false;
          this.$list.push( item );
      }
      return this.$list;
  }

    get open(): Array<ShoppingItem>{
        return this.listHandler.open;
    }

    get done(): Array<ShoppingItem>{
      return this.listHandler?.done;
    }

    @Input()
    set list( items:ShoppingItem[] ){
        this.$list = items;
        this.$list.forEach( ((value, index) => {
            value.insert = false;
            value.identifier = this.inputIndex(index);
            if( !value.bought ) value.bought = false;
        }));

        this.$open = this.$list.filter( e=>!e.bought );
        this.$done = this.$list.filter( e=>e.bought );
        /*
        console.log('-------set-------');
        console.log(this.$list);
        console.log('--------------');
         */

    }


    markAsBought( i:ShoppingItem ){
        i.bought = true;
    }

    @Input()
    set storeId( id:string ){
        if( !id || id.length <= 0 ){
            this.$shopId = StoreId.default();
        } else {
            this.$shopId = new StoreId(id);
        }
    }

    get storeId(){
      return this.$shopId?.id;
    }




    startX: number;
    endX: number;

    touchstart(t:TouchEvent){
        console.log("touch.start");
        console.log(t);
        this.startX = t.touches[0].pageX;
    }

    touchend(t:TouchEvent, item: ShoppingItem){
        console.log("touch.end");
        console.log(t);
        if( t.touches.length > 0) t.touches[0].pageX;
        if(  this.startX < this.endX){
            //alert('swipe right')
            item.bought = false;
        } else {
            this.markAsBought(item);
            //this.itemBought(item);
            //alert('swipe left')
        }
    }

    touchmoved(t){
        console.log("touch.moved");
        console.log(t);
        this.endX = t.touches[0].pageX;
    }


    enter($event: any, i: ShoppingItem, index: number) {

        window.setTimeout( ()=>{
            console.log("open.length" + this.$open.length);
            let htmlElement = document.getElementById( this.storeId +"-input" );
            if( htmlElement ) htmlElement.focus();
        } , 300 );
    }

    inputIndex( index:number ): string{
        return "input-element-" + this.$shopId + "-" + index;
    }
}


export interface Item {
    id:string;
    i:number;
    value:string;
    insert: boolean;
}

class StoreId{

    private readonly store:string;

    constructor(store) {
        this.store = store;
    }

    get id(){
        return this.store;
    }

    get inputId(){
        let s = this.store && this.store.length > 0 ? this.store : 'default';
        return s + '-input';
    }

    inputIndex( index:number ): string{
        return "input-element-" + this.store + "-" + index;
    }


    static default() {
        return new StoreId('default');
    }
}

class ListHandler{

    private _$open: Array<ShoppingItem>;
    private _$done: Array<ShoppingItem>;
    private $storeId: StoreId;

    private endX: number;
    private startX: number;

    constructor( list:Array<ShoppingItem> , store:StoreId ) {
        this._$done = new Array<ShoppingItem>();
        this.$storeId = store;
        this.init( list );
    }

    private init( list:Array<ShoppingItem> ){
        list.forEach( ((value, index) => {
            value.insert = false;
            value.identifier = this.$storeId.inputIndex(index);
            if( !value.bought ) value.bought = false;
        }));

        this._$open = list.filter(e=>!e.bought );
        this._$done = list.filter(e=>e.bought );
    }

    touchstart(t:TouchEvent, item:ShoppingItem){
        console.log("touch.start");
        console.log(t);
        this.endX = undefined;
        this.startX = t.touches[0].pageX;
        item.swiped = true;
    }

    touchmoved(t){
        console.log("touch.moved");
        console.log(t);
        this.endX = t.touches[0].pageX;
    }

    touchend(t:TouchEvent, item: ShoppingItem){
        console.log("touch.end");
        console.log(t);
        item.swiped = false;
        if( t.touches.length > 0) t.touches[0].pageX;
        if(  this.startX < this.endX){
            //alert('swipe right')
            item.bought = false;
        } else {
            item.bought = true;
            this.itemBought(item);
            //alert('swipe left')
        }
    }

    public itemBought( item:ShoppingItem ){
        item.bought = true;
        this._$open
            .filter( e=>e.bought )
            .forEach( e=>{
                this._$done.push( e );
            });
        this._$open = this._$open.filter(e=>!e.bought );
    }


    get open(): Array<ShoppingItem> {
        if( this._$open.filter( i=>i.insert == true ).length == 0 ){
            let item = new ShoppingItem();
            item.i = -1;
            item.id = undefined;
            item.identifier = this.$storeId.inputId;
            item.name = null;
            item.insert = true;
            item.touched = false;
            this._$open.push( item );
        }
        return this._$open;
    }

    get done(): Array<ShoppingItem> {
        return this._$done;
    }
}

class InputElement {

    private readonly $store:StoreId;
    private readonly service:ShoppingListService;

    constructor(store:StoreId, s:ShoppingListService) {
        this.$store = store;
        this.service = s;
    }

    public keyListener( event:KeyboardEvent , item:ShoppingItem, index:number ){
        console.log(event);
        console.log(item);
        if( event.code === 'Enter' ){
            console.log('---enter---');
            this.enter(event,item,index);
            return;
        }
        if( item.name && item.name.trim().length > 1 ){
            if( item.i == -1 ){
                item.insert = false;
                item.touched = true;
                item.identifier = 'item-' + item.i;
            }
        }
    }

    enter($event: any, i: ShoppingItem, index: number) {
        window.setTimeout( ()=>{
            let htmlElement = document.getElementById( this.$store.inputId );
            if( htmlElement ) htmlElement.focus();
        } , 300 );
    }

    addItem( item:ShoppingItem , index:number ) {
        if( item.name && item.name.trim().length > 0 ){
            item.identifier = this.$store + '-' + index;
            this.service.addItem(item.name,this.$store.id, (resp)=>{
                console.log(resp);
            });
        }
    }

    get identifier(){
        let s = this.$store && this.$store.id.length > 0 ? this.$store : 'default';
        return s + '-input';
    }

}

class ShoppingItemAggregate{

    private readonly _item: ShoppingItem;
    private startX: number;
    private endX: number;

    constructor(item: ShoppingItem) {
        this._item = item;
    }

    get item(){
        return this._item;
    }
}
