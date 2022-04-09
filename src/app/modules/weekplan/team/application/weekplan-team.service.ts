import { Injectable } from '@angular/core';
import {CisHttpService} from '../../../../system/cis-connector/services/cis-http.service';
import {TeamMember} from "../model/team";

@Injectable({
  providedIn: 'root'
})
export class WeekplanTeamService {

  constructor( private http: CisHttpService) { }

  public team( success: (members: Array<TeamMember>) => void ){
        this.http.cisGet<Array<TeamMember>>('weekplan/team')
            .subscribe( (resp) => {
                console.log('--team');
                console.log( resp.body );
                console.log('--team');
                success(resp.body);
            });
  }

}
