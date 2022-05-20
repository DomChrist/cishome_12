
    export interface Todo {
        id: string;
        title: string;
        description: string;
        category: string;
        due?: any;
        important: boolean;
        overdue: boolean;
        daysUntil: number;
        filter: Filter;
        created: Date;
    }

    export interface InCategories {
        default: string[];
    }

    export interface MultiTodoResponse {
        list: Todo[];
        inCategories: InCategories;
        categories: string[];
        overdue: any[];
    }


    export interface Filter {
        today: boolean;
        overdue: boolean;
        currentWeek: boolean;
        nextWeek: boolean;
    }
