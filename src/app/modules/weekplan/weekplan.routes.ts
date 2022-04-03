import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders, NgModule} from '@angular/core';
import {AppComponent} from "../../app.component";
import {WeekplanComponent} from "./plan/view/weekplan/weekplan.component";
import {NewTasksComponent} from "./tasks/view/tasks/new-tasks/new-tasks.component";
import {TasksComponent} from "./tasks/view/tasks/tasks/tasks.component";
import {WeekplanDashboardComponent} from "./plan/view/weekplan-dashboard/weekplan-dashboard.component";
import {TeamDashboardComponent} from "./team/view/team-dashboard/team-dashboard.component";
import {AppMainComponent} from "../../app.main.component";


const routes = [
      {path: '' , component: WeekplanDashboardComponent},
      {path: 'tasks' , component: TasksComponent},
      {path: 'tasks/new' , component: NewTasksComponent},
      {path: 'team' , component: TeamDashboardComponent},
      {path: 'team/new' , component: TeamDashboardComponent}
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class WeekplanRoutes {}
