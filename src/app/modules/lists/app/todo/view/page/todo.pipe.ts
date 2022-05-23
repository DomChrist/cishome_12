import { Pipe, PipeTransform } from '@angular/core';
import {Todo} from '../../model/todo-model';

@Pipe({
  name: 'todo'
})
export class TodoPipe implements PipeTransform {

  transform(value: Array<Todo>, f: FilterArguments ): Array<Todo> {
    if ( !value ){ return []; }
    const l = value.filter( v => f.check(v) );
    console.log('transform');
    console.log(l);
    return l;
  }

}

export class FilterArguments{

    private $todayActive = false;
    private $currentWeekActive = false;
    private $nextWeekActive = false;

    private $activeCategories = new Array<string>();

    public clearDaysFilter(){
        this.$todayActive = false;
        this.$nextWeekActive = false;
        this.$currentWeekActive = false;
    }

    public list( todos: Todo[] ){
        return new TodoPipe().transform( todos , this );
    }

    public check( t: Todo ): boolean {
        console.log('---check---');
        console.log(this.$todayActive);
        console.log(t);
        console.log( this.activeCategories );

        const catCheck = this.$activeCategories.includes( t.category );
        console.log('cat check = ' + catCheck);
        if ( !catCheck ){ return false; }

        if ( this.todayActive && !t.filter.today ){ return false; }
        if ( this.currentWeekActive && !t.filter.currentWeek ){ return false; }
        if ( this.nextWeekActive && !t.filter.nextWeek ){ return false; }

        return true;
    }

    get todayActive(): boolean {
        return this.$todayActive;
    }

    set todayActive(value: boolean) {
        this.clearDaysFilter();
        this.$todayActive = value;
    }

    get currentWeekActive(): boolean {
        return this.$currentWeekActive;
    }

    set currentWeekActive(value: boolean) {
        this.clearDaysFilter();
        this.$currentWeekActive = value;
    }

    get nextWeekActive(): boolean {
        return this.$nextWeekActive;
    }

    set nextWeekActive(value: boolean) {
        this.clearDaysFilter();
        this.$nextWeekActive = value;
    }

    get activeCategories(): string[] {
        return this.$activeCategories;
    }

    set activeCategories(value: string[]) {
        this.$activeCategories = value;
    }

    get filterActive(): boolean{
        if ( this.todayActive || this.currentWeekActive || this.nextWeekActive ){
            return true;
        }
        return false;
    }
}
