import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ShoppingListService} from '../../../../services/shopping-list.service';
import {ShoppingItem} from '../../../domain/shopping-model';
import {Message} from 'primeng/api';

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

  public showSettlement = false;

    startX: number;
    endX: number;

  @Input()
  public listReference: string;

  @ViewChild('listinput')
  public input: ElementRef;

  @ViewChild('listElement') public listElement: ElementRef;

  @Output() refresh = new EventEmitter<void>();
  @Output() successSettlement = new EventEmitter<Message>();


  constructor( private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
      this.inputElement = new InputElement( this.$shopId , this.shoppingListService );
      this.listHandler = new ListHandler(this.$list, this.listReference, this.$shopId, this.shoppingListService);
  }

  public id( i: Item): string{
      return 'item-' + i.id;
  }

  get list(){
      if ( this.$list.filter( i => i.insert === true ).length === 0 ){
          const item = new ShoppingItem();
          item.i = -1;
          item.id = '';
          item.identifier = this.storeId + '-input' ;
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
    set list( items: ShoppingItem[] ){
        this.$list = items;
        this.$list.forEach( ((value, index) => {
            value.insert = false;
            value.identifier = this.inputIndex(index);
            if ( !value.bought ){
                value.bought = false;
            }
        }));

        this.$open = this.$list.filter( e => !e.bought );
        this.$done = this.$list.filter( e => e.bought );

    }


    markAsBought( i: ShoppingItem ){
        i.bought = true;
    }

    @Input()
    set storeId( id: string ){
        if ( !id || id.length <= 0 ){
            this.$shopId = StoreId.default();
        } else {
            this.$shopId = new StoreId(id);
        }
    }

    get storeId(){
      return this.$shopId?.id;
    }



    touchstart(t: TouchEvent){
        this.startX = t.touches[0].pageX;
    }

    touchend(t: TouchEvent, item: ShoppingItem){
        if ( t.touches.length > 0){ this.endX = t.touches[0].pageX; }
        if (  this.startX < this.endX ) {
            item.bought = false;
            this.listHandler.removeFromList(item);
            console.log('item removed');
        } else {
            this.markAsBought(item);
        }
    }

    enter($event: any, i: ShoppingItem, index: number) {

        window.setTimeout( () => {
            console.log('open.length' + this.$open.length);
            const htmlElement = document.getElementById( this.storeId + '-input' );
            if ( htmlElement ){
                htmlElement.focus();
            }
        } , 300 );
    }

    inputIndex( index: number ): string{
        return 'input-element-' + this.$shopId + '-' + index;
    }

    reload() {
        this.refresh.emit();
    }

    public success( event: Message ){
      this.successSettlement.emit(event);
    }

}


export interface Item {
    id: string;
    i: number;
    value: string;
    insert: boolean;
}

class StoreId{

    private readonly store: string;

    constructor(store) {
        this.store = store;
    }

    static default() {
        return new StoreId('default');
    }

    get id(){
        return this.store;
    }

    get inputId(){
        const s = this.store && this.store.length > 0 ? this.store : 'default';
        return s + '-input';
    }

    inputIndex( index: number ): string{
        return 'input-element-' + this.store + '-' + index;
    }



}

class ListHandler{

    private $open: Array<ShoppingItem>;
    private $done: Array<ShoppingItem>;
    private $storeId: StoreId;

    private endX: number;
    private startX: number;
    private $service: ShoppingListService;
    private listReference: string;

    constructor( list: Array<ShoppingItem> , listReference: string, store: StoreId, service: ShoppingListService ) {
        this.$done = new Array<ShoppingItem>();
        this.$storeId = store;
        this.$service = service;
        this.listReference = listReference;
        this.init( list );
    }

    private init( list: Array<ShoppingItem> ){
        list.forEach( ((value, index) => {
            value.insert = false;
            value.identifier = this.$storeId.inputIndex(index);
            if ( !value.bought ){ value.bought = false; }
        }));

        this.$open = list.filter(e => !e.bought );
        this.$done = list.filter(e => e.bought );
    }

    touchstart(t: TouchEvent, item: ShoppingItem){
        console.log('touch.start');
        console.log(t);
        this.endX = undefined;
        this.startX = t.touches[0].pageX;
    }

    touchmoved(t , item: ShoppingItem){
        console.log('touch.moved');
        console.log(t);
        this.endX = t.touches[0].pageX;
        if ( this.startX < this.endX ){
            item.doneSwipe = false;
            item.removeSwipe = true;
        } else {
            item.doneSwipe = true;
            item.removeSwipe = false;
        }
    }

    touchend(t: TouchEvent, item: ShoppingItem){
        const width = document.getElementsByClassName('item-div')[0].clientWidth * 0.75;

        console.log('touch.end');
        console.log(t);
        item.removeSwipe = false;
        item.doneSwipe = false;
        console.log( this.startX );
        console.log( this.endX );
        const swipe = Math.abs( this.startX - (this.endX ? this.endX : 0) );
        console.log('swipe + ' + swipe);
        if ( swipe < width ){ return; }
        if ( t.touches.length > 0) { t.touches[0].pageX; }
        if (  this.startX < this.endX){
            this.removeFromList(item);
            item.bought = false;
        } else {
            item.bought = true;
            this.itemBought(item);
        }
    }

    public itemBought( item: ShoppingItem ){
        item.bought = true;
        this.$open
            .filter( e => e.bought )
            .forEach( e => {
                this.$done.push( e );
            });
        this.$open = this.$open.filter(e => !e.bought );
    }

    notBought(i: ShoppingItem) {
        i.bought = false;
        i.insert = false;
        this.$open = this.$open.filter( e => !e.insert );
        this.$open.push( i );
        console.log( this.$done.length );
        this.$done = this.$done.filter(e => e.bought );
        console.log( this.$done.length );
    }

    public removeFromList( item: ShoppingItem ){
        this.$service.remove( this.listReference , item.id , () => {
            this.$open = this.$open.filter( i => i.id !== item.id );
        });
    }


    get open(): Array<ShoppingItem> {
        if ( this.$open.filter( i => i.insert === true ).length === 0 ){
            const item = new ShoppingItem();
            item.i = -1;
            item.id = undefined;
            item.identifier = this.$storeId.inputId;
            item.name = null;
            item.insert = true;
            item.touched = false;
            this.$open.push( item );
        }
        return this.$open;
    }

    get done(): Array<ShoppingItem> {
        return this.$done;
    }


}

class InputElement {

    private readonly $store: StoreId;
    private readonly service: ShoppingListService;

    constructor(store: StoreId, s: ShoppingListService) {
        this.$store = store;
        this.service = s;
    }

    public keyListener( event: KeyboardEvent , item: ShoppingItem, index: number ){
        console.log(event);
        console.log(item);
        if ( event.code === 'Enter' ){
            console.log('---enter---');
            this.enter(event, item, index);
            return;
        }
        if ( item.name && item.name.trim().length > 1 ){
            if ( item.i === -1 ){
                item.insert = false;
                item.touched = true;
                item.identifier = 'item-' + item.i;
            }
        }
    }

    enter($event: any, i: ShoppingItem, index: number) {
        window.setTimeout( () => {
            const htmlElement = document.getElementById( this.$store.inputId );
            if (htmlElement ){
                htmlElement.focus();
            }
        } , 300 );
    }

    addItem( item: ShoppingItem , index: number ) {
        if (item.name && item.name.trim().length > 0 ){
            item.identifier = this.$store + '-' + index;
            this.service.addItem(item.name, this.$store.id, (resp) => {

                console.log(resp);
            });
        }
    }

    get identifier(){
        const s = this.$store && this.$store.id.length > 0 ? this.$store : 'default';
        return s + '-input';
    }

}

class ShoppingItemAggregate{

    private readonly $item: ShoppingItem;
    private readonly listId: string;
    private startX: number;
    private endX: number;
    private readonly service: ShoppingListService;


    constructor(item: ShoppingItem, service: ShoppingListService) {
        this.$item = item;
    }



    get item(){
        return this.$item;
    }
}

interface AddItemResponse{
    newItemId: string;
}
