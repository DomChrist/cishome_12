import { Pipe, PipeTransform } from '@angular/core';
import {ShoppingItem} from "../../../domain/shopping-model";

@Pipe({
  name: 'shoppingList'
})
export class ShoppingListPipe implements PipeTransform {

  transform(value: Array<ShoppingItem>, active: boolean): Array<ShoppingItem> {
      console.log(value);
      console.log(active);
    if( value ){
        let filter = value.filter(i => {
            let b = !i.bought ? false : i.bought;
            return b === active;
        });
        return filter;
    }
    return value;
  }

}
