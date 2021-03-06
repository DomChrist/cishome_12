import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeekplanComponent } from './plan/view/weekplan/weekplan.component';
import { TasksComponent } from './tasks/view/tasks/tasks/tasks.component';
import { NewTasksComponent } from './tasks/view/tasks/new-tasks/new-tasks.component';
import { TeamDashboardComponent } from './team/view/team-dashboard/team-dashboard.component';
import { WeekplanDashboardComponent } from './plan/view/weekplan-dashboard/weekplan-dashboard.component';
import { WeekdayPipe } from './plan/infrastructure/filter/weekday.pipe';
import { TeamMemberTaskPipe } from './plan/infrastructure/filter/team-member-task.pipe';
import {WeekplanRoutes} from './weekplan.routes';
import {InputTextModule} from 'primeng/inputtext';
import {FormsModule} from '@angular/forms';
import {FileUploadModule} from 'primeng/fileupload';
import {TableModule} from 'primeng/table';
import {SidebarModule} from 'primeng/sidebar';
import {DragDropModule} from 'primeng/dragdrop';
import {DialogModule} from 'primeng/dialog';
import {RadioButtonModule} from 'primeng/radiobutton';
import {AvatarModule} from "primeng/avatar";

@NgModule({
    imports: [
        CommonModule,
        WeekplanRoutes,
        InputTextModule,
        FormsModule,
        FileUploadModule,
        TableModule,
        SidebarModule,
        DragDropModule,
        DialogModule,
        RadioButtonModule,
        AvatarModule
    ],
    declarations: [WeekplanComponent, TasksComponent, NewTasksComponent,
        TeamDashboardComponent, WeekplanDashboardComponent, WeekdayPipe, TeamMemberTaskPipe]
})
export class WeekplanModule { }
