export class ShoppingModel {
    id: string;
    name: string;
    list: ShoppingItem[];
}

export class ShoppingItem {
    id: string;
    name: string;
    counter: number;
    store: string;



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
