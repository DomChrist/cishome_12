import { Pipe, PipeTransform } from '@angular/core';
import {Meeting} from "../../../domain/meeting-model";

@Pipe({
  name: 'meetingList'
})
export class MeetingListPipe implements PipeTransform {

  transform(value: Meeting[], search:string): unknown {
      if( search.length === 0 ) return value;

      let meetings = value.filter( (m) => {
          let index = m.meetingTopic.toLowerCase().includes(search.toLowerCase());
          if( index ) return m;
          return null;
      }).filter( m=> m != null );

      return meetings;

  }

}
