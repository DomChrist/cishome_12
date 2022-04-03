import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'teamMemberTask'
})
export class TeamMemberTaskPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
