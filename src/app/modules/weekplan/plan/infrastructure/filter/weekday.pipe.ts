import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'weekday'
})
export class WeekdayPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    switch (value) {
      case 0:
        return 'Montag';
      case 1:
        return 'Dienstag';
      case 2:
        return 'Mittwoch';
      case 3:
        return 'Donnerstag';
      case 4:
        return 'Freitag';
      case 5:
        return 'Samstag';
      case 6:
        return 'Sonntag';
    }
  }

}
