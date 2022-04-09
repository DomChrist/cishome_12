import {Component, Inject, OnInit} from '@angular/core';
import {CisAuthService} from '../../../../../system/cis-connector/services/cis-auth-service';
import {CisHttpService} from '../../../../../system/cis-connector/services/cis-http.service';
import {environment} from '../../../../../../environments/environment';
import {Assignee, DayOfWeek, ToDo, Weekplan, WeekplanTask} from '../../model/weekplan';
import {TeamMember} from '../../../team/model/team';
import { Task } from '../../../tasks/model/task';
import {TaskService} from '../../../tasks/application/task.service';
import {WeekplanTeamService} from "../../../team/application/weekplan-team.service";
import {WeekplanService} from "../../application/weekplan.service";

@Component({
  selector: 'wp-plan',
  templateUrl: './weekplan.component.html',
  styleUrls: ['./weekplan.component.css']
})
export class WeekplanComponent implements OnInit {

  public plan: Weekplan;

  public allTasks: Array<Task>;
  public teamMember: Array<TeamMember>;

  public showNewTaskBar = false;
  public showNewTaskDialog = false;

  public draggedTask: Task;

  public newToDoTask: Task;
  public newToDoDay: number;
  public newDayOfWeek: DayOfWeek;

  constructor( private user: CisAuthService, private http: CisHttpService,
               private weekplan: WeekplanService,
               private taskCase: TaskService, private team: WeekplanTeamService) { }


  ngOnInit() {
    this.loadWorkplan();
  }

  public loadWorkplan(){
      this.team.team( (team) => {
          this.taskCase.loadTasks( (tasks: Task[]) => {
              this.weekplan.loadWeekplan( team , tasks , (wp) => {
                  this.allTasks = tasks;
                  this.teamMember = team;
                  this.plan = wp;
              } );
          } );
      });
  }


  public loadTeam(){
      /*
    const url = 'weekplan/team';
    this.http.cisGet<Array<TeamMember>>( url ).subscribe( (data) => {
      console.log(data);
      this.teamMember = data.body;
      this.loadTasks();
    });
       */
    const tm = new TeamMember();
    tm.id = this.user.user.sub;
    tm.name = this.user.user.given_name + ' ' + this.user.user.family_name;
    console.log( tm );
    this.teamMember = new Array<TeamMember>();
    this.teamMember.push( tm );
    console.log( '---tm---' );
    console.log( this.user.user.sub );
    this.loadTasks();

  }
  private loadTasks(){
      this.taskCase.loadTasks( (t) => {
          this.allTasks = t;
          this.loadWorkplan();
      });
  }



  public openShowBar(){
    this.showNewTaskBar = true;
    if ( !this.allTasks ) { this.loadTasks(); }
  }



  public dropTask(day, event){
    console.log(event);
    this.newToDoTask = this.draggedTask;
    this.draggedTask = null;
    this.showNewTaskDialog = true;
    this.newDayOfWeek = day;
  }

  public dragStart( day: DayOfWeek , item: Task ){
    this.draggedTask = item;
  }

  public addTask( t: TeamMember ){

    const task = new WeekplanTask();
    task.id = this.newToDoTask.id;
    task.description = this.newToDoTask.description;
    task.image = this.newToDoTask.taskImage.safeUrl;

    const assignee = new Assignee();
    assignee.firstName = t.name;
    assignee.id = t.id;
    assignee.image = t.image?.baseImage;

    const todo = new ToDo();
    todo.assignee = assignee;
    todo.day = this.newDayOfWeek;
    todo.task = task;

    if ( !this.newDayOfWeek.tasks ){
      this.newDayOfWeek.tasks = new Array<ToDo>();
    }
    this.newDayOfWeek.tasks.push( todo );
    this.showNewTaskDialog = false;

    this.saveNewTask(todo);

  }

  private saveNewTask(todo: ToDo){
    const request = {
        weekplan : this.plan.reference.uuid,
        day : todo.day.day,
        taskId : todo.task.id,
        assigneeId : todo.assignee.id
    };
    const url = 'weekplan/plan/add/task';
    this.http.cisPut<ToDo>( url , request ).subscribe( (data) => {
      console.log(data);
      todo.id = data.body.id;
    });
  }

}
