import { Injectable } from '@angular/core';
import {Assignee, Weekplan} from "../model/weekplan";
import {TeamMember} from "../../team/model/team";
import {CisHttpService} from "../../../../system/cis-connector/services/cis-http.service";
import {Task} from "../../tasks/model/task";

@Injectable({
  providedIn: 'root'
})
export class WeekplanService {

  constructor( private http: CisHttpService) { }

    public loadWeekplan( teamMembers: Array<TeamMember>, tasks: Array<Task> , success: ( w: Weekplan ) => void ){
        const url = 'weekplan/plan';
        this.http.cisGet<Weekplan>( url ).subscribe( (data) => {
            console.log(data);
            const plan = data.body;
            plan.list.forEach( e => {
                e.tasks.forEach( t => {
                    const member: TeamMember = teamMembers.filter(u => u.id === t.assignee.id )[0];
                    if ( member ){
                        // t.assignee.image = this.teamMember.filter( u => u.id === t.assignee.id )[0].image.baseImage;
                        t.assignee = new Assignee();
                        t.assignee.initial = member.initial;
                    } else {
                        console.error('team member not found');
                    }
                    t.task.image = tasks.filter( ta => ta.id === t.task.taskId )[0].taskImage.safeUrl;

                });
            });
            success( plan );
        });
    }


}
