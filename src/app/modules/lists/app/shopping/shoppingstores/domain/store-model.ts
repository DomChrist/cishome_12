
    export interface StoreId {
        id: string;
    }

    export interface Name {
        name: string;
        key: string;
    }

    export interface Link {
        link: string;
        searchPath: string;
    }

    export interface Store {
        storeId: StoreId;
        name: Name;
        link: Link;
    }

    export interface StoreAggregate {
        store: Store;
    }


