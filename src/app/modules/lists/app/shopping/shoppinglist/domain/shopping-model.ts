export class ShoppingModel {
    id: string;
    name: string;
    list: ShoppingItem[];
    storeGroupedList: Map<string,ShoppingItem[]>
}

export class ShoppingItem {
    id: string;
    i:number;
    name: string;
    counter: number;
    store: string;
    touched: boolean;
    insert: boolean;
    bought: boolean;
    identifier:string;
    swiped: boolean;
}

export class ShoppingAggregate{

    private model: ShoppingModel;

    constructor(model: ShoppingModel) {
        this.model = model;
    }

    get list(){
        return this.model.list;
    }



}


export interface ResponseList {
    id: string;
    name: string;
    list?: any;
    storeGroupedList?: any;
    stores: any[];
}

export interface ListManagementResponse {
    responseList: ResponseList[];
}
