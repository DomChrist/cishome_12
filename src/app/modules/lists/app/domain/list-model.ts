export class ListAggregate {
    id: ListId;
    list: List;

    public removeItem( item:Item ): void {
        this.list.items = this.list.items.filter( e=>e.id !== item.id );
    }

}

export class List {
    name: string;
    items: Item[];

    public removeItem(item: Item): void {
        this.items = this.items.filter( e=>e.id !== item.id );
    }
}

export interface Item {
    id: string;
    name: string;

    hidden: boolean;
}

export interface ListId{
    id: string;
}
