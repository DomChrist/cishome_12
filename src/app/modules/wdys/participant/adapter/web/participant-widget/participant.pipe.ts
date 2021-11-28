import { Pipe, PipeTransform } from '@angular/core';
import {Participant} from "../../../domain/model/participant-model";

@Pipe({
  name: 'participant'
})
export class ParticipantPipe implements PipeTransform {

  transform(value: Participant[], args: string): Participant[] {
      if( !args ) args = '';
      return value.filter( (p:Participant)=>p.fullName.toLowerCase().includes(args.toLowerCase()) )
  }

}
