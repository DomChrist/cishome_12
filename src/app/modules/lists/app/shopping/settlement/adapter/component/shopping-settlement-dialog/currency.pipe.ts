import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currency'
})
export class CurrencyPipe implements PipeTransform {

  transform(value: string, n1:number): string {
    if( Number.isNaN(n1)) return '0,00';
    n1 = n1 / 100;
    if( Number.isNaN(n1) ){
        return "0,00";
    } else {
        return String(n1).replace(".",",");
    }
  }

}
