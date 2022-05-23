
    export interface Todo {
        id: string;
        title: string;
        description: string;
        category: string;
        due?: Date;
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

    export class FilterCategory{
        public active = true;
        public name: string;

        public static with( s: string ): FilterCategory {
            const c = new FilterCategory();
            c.name = s;
            c.active = true;
            return c;
        }

    }
