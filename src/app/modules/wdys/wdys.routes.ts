import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {AppMainComponent} from "../../app.main.component";
import {WdysDashboardComponent} from "./wdys-dashboard/wdys-dashboard.component";
import {NewMeetingComponent} from "./meeting/adapter/web/new-meeting/new-meeting.component";
import {MeetingOverviewComponent} from "./meeting/adapter/web/meeting-overview/meeting-overview.component";
import {MeetingSessionOverviewComponent} from "./meeting/adapter/web/meeting-session-overview/meeting-session-overview.component";
import {ParticipantOverviewComponent} from "./participant/adapter/web/participant-overview/participant-overview.component";
import {AuthGuard} from "../../system/cis-connector/services/auth.guard";
import {SessionCollaborationComponent} from "./collaborate/web/session-collaboration/session-collaboration.component";

/*
const routes = [
    {
        path: 'app/wdys', component: AppMainComponent,
        children: [
            {path: '', component: WdysDashboardComponent},
            {path: 'meeting/add', component: NewMeetingComponent},
            {path: 'meeting/view/:id', component: MeetingOverviewComponent},
            {path: 'meeting/view/:id/session/:sessionId', component: MeetingSessionOverviewComponent},
        ]
    }
]
*/

const routes = [
            {path: '', component: WdysDashboardComponent, canActivate: [AuthGuard]},
            {path: 'meeting/add', component: NewMeetingComponent , canActivate: [AuthGuard]},
            {path: 'meeting/view/:id', component: MeetingOverviewComponent , canActivate: [AuthGuard]},
            {path: 'meeting/view/:id/session/:sessionId', component: MeetingSessionOverviewComponent , canActivate: [AuthGuard]},
            {path: 'participants' , component: ParticipantOverviewComponent, canActivate: [AuthGuard]},
            {path: 'meeting/collaboration/session/:id' , component: SessionCollaborationComponent}

]


@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class WdysRoutingModule {
}
