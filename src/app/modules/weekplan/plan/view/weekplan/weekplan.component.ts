import { Component, OnInit } from '@angular/core';
import {Task} from "../../../tasks/model/task";
import {HttpClient} from "@angular/common/http";
import {TeamMember} from "../../../team/model/team";
import {Assignee, DayOfWeek, ToDo, Weekplan, WeekplanTask} from "../../model/weekplan";
import {AppService} from "../../../../../system/app.service";
import {environment} from "../../../../../../environments/environment";

@Component({
  selector: 'wp-plan',
  templateUrl: './weekplan.component.html',
  styleUrls: ['./weekplan.component.css']
})
export class WeekplanComponent implements OnInit {

  public plan:Weekplan;

  public allTasks:Array<Task>;
  public teamMember: Array<TeamMember>;

  public showNewTaskBar = false;
  public showNewTaskDialog = false;

  public draggedTask: Task;

  public newToDoTask: Task;
  public newToDoDay: number;
  public newDayOfWeek: DayOfWeek;

  constructor( private user: AppService, private http: HttpClient) { }


  ngOnInit() {
    this.loadTeam();
  }

  public loadWorkplan(){
    let url = environment.cisHome.service + 'weekplan/plan';
    this.http.get<Weekplan>( url , {headers:this.user.createAuthHeader()}).subscribe( (data) =>{
        console.log(data);
        this.plan = data;
        this.plan.list.forEach( e=>{
          e.tasks.forEach( t=> {
            t.assignee.image = this.teamMember.filter( u=>u.id === t.assignee.id )[0].image.baseImage;
            t.task.image = this.allTasks.filter( ta => ta.id === t.task.taskId )[0].taskImage.baseImage;
          })
        });
    });
  }


  public loadTeam(){
    let url = environment.cisHome.service + 'weekplan/team';
    this.http.get<Array<TeamMember>>( url , {headers:this.user.createAuthHeader()}).subscribe( (data) =>{
      console.log(data);
      this.teamMember = data;
      this.loadTasks();
    });
  }
  private loadTasks(){
    let url = environment.cisHome.service + 'weekplan/tasks';
    this.http.get<Array<Task>>( url , {headers:this.user.createAuthHeader()} ).subscribe( (data)=>{
      console.log(data);
      this.allTasks = data;
      this.loadWorkplan();
    });
  }



  public openShowBar(){
    this.showNewTaskBar = true;
    if( !this.allTasks ) this.loadTasks();
  }



  public dropTask(day,event){
    console.log(event);
    this.newToDoTask = this.draggedTask;
    this.draggedTask = null;
    this.showNewTaskDialog = true;
    this.newDayOfWeek = day;
  }

  public dragStart( day: DayOfWeek , item: Task ){
    this.draggedTask = item;
  }

  public addTask( t:TeamMember ){

    let task = new WeekplanTask();
      task.id = this.newToDoTask.id;
      task.description = this.newToDoTask.description;
      task.image = this.newToDoTask.taskImage.baseImage;

    let assignee = new Assignee();
      assignee.firstName = t.name;
      assignee.id = t.id;
      assignee.image = t.image.baseImage;

    let todo = new ToDo();
      todo.assignee = assignee;
      todo.day = this.newDayOfWeek;
      todo.task = task;

    if( !this.newDayOfWeek.tasks ){
      this.newDayOfWeek.tasks = new Array<ToDo>();
    }
    this.newDayOfWeek.tasks.push( todo );
    this.showNewTaskDialog = false;

    this.saveNewTask(todo);

  }

  private saveNewTask(todo:ToDo){
    let request = {
        'weekplan' : this.plan.reference.uuid,
        'day' : todo.day.day,
        'taskId' : todo.task.id,
        'assigneeId' : todo.assignee.id
    }
    const url = environment.cisHome.service + 'weekplan/plan/add/task';
    this.http.put<ToDo>( url , request , {headers:this.user.createAuthHeader()} ).subscribe( (data)=>{
      console.log(data);
      todo.id = data.id;
    });
  }

}
