import {ShoppingItem} from "../../shoppinglist/domain/shopping-model";
import {StoreId} from "../../shoppingstores/domain/store-model";


export class Settlement{
    private _store: StoreId;
    private _items: Array<SettlementItem>;

    private _sum: number;

    public static withShoppingItems( store:StoreId, list:Array<ShoppingItem>  ){
        let settlement = new Settlement();
            settlement._store = store;
            settlement._items = list.map( i=>new SettlementItem(i) );
        return settlement;
    }


    get items(): Array<SettlementItem> {
        return this._items;
    }

    get store(): StoreId {
        return this._store;
    }


    get sum(): number {
        return this._sum;
    }

    set sum(value: number) {
        this._sum = value;
    }
}

export class SettlementItem{

    private _item: ShoppingItem;

    private _counter = 1;

    private _price: number;

    constructor( item:ShoppingItem) {
        this._item = item;
    }


    get item(): ShoppingItem {
        return this._item;
    }

    set item(value: ShoppingItem) {
        this._item = value;
    }

    get counter(): number {
        return this._counter;
    }

    set counter(value: number) {
        this._counter = value;
    }

    get price(): number {
        return this._price;
    }

    set price(value: number) {
        this._price = value;
    }
}
