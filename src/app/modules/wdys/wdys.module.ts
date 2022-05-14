import { NgModule } from '@angular/core';
import {CommonModule, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { WdysDashboardComponent } from './wdys-dashboard/wdys-dashboard.component';
import {WdysRoutingModule} from "./wdys.routes";
import { NewMeetingComponent } from './meeting/adapter/web/new-meeting/new-meeting.component';
import {InputTextModule} from "primeng/inputtext";
import {FormsModule} from "@angular/forms";
import {MenuModule} from "primeng/menu";
import {TimelineModule} from "primeng/timeline";
import {CardModule} from "primeng/card";
import {CalendarModule} from "primeng/calendar";
import {InputTextareaModule} from "primeng/inputtextarea";
import {DividerModule} from "primeng/divider";
import {ChipsModule} from "primeng/chips";
import {AutoCompleteModule} from "primeng/autocomplete";
import { CreateParticipantDialogComponent } from './participant/adapter/web/create-participant-dialog/create-participant-dialog.component';
import {DialogModule} from "primeng/dialog";
import { SearchParticipantComponent } from './participant/adapter/web/search-participant/search-participant.component';
import {AvatarModule} from "primeng/avatar";
import { MeetingOverviewComponent } from './meeting/adapter/web/meeting-overview/meeting-overview.component';
import {AvatarGroupModule} from "primeng/avatargroup";
import {TooltipModule} from "primeng/tooltip";
import { MeetingListComponent } from './meeting/adapter/web/meeting-list/meeting-list.component';
import {OrderListModule} from "primeng/orderlist";
import {DataViewModule} from "primeng/dataview";
import { AddSessionComponent } from './meeting/adapter/web/add-session/add-session.component';
import {CheckboxModule} from "primeng/checkbox";
import { MeetingSessionOverviewComponent } from './meeting/adapter/web/meeting-session-overview/meeting-session-overview.component';
import {ChipModule} from "primeng/chip";
import { CreateTodoComponent } from './todo/adapter/create-todo/create-todo.component';
import { ViewSessionTodoComponent } from './todo/adapter/view-session-todo/view-session-todo.component';
import {TableModule} from "primeng/table";
import { ViewMeetingTodoComponent } from './todo/adapter/view-meeting-todo/view-meeting-todo.component';
import {BreadcrumbModule} from "primeng/breadcrumb";
import {ToolbarModule} from "primeng/toolbar";
import {TagModule} from "primeng/tag";
import {SidebarModule} from "primeng/sidebar";
import { CreateMeetingNoteComponent } from './meeting/adapter/web/create-meeting-note/create-meeting-note.component';
import { ShowSessionNotesComponent } from './meetingnote/adapter/web/show-session-notes/show-session-notes.component';
import {DropdownModule} from "primeng/dropdown";
import { MeetingListPipe } from './meeting/adapter/web/meeting-list/meeting-list.pipe';
import {SpeedDialModule} from "primeng/speeddial";
import { SessionAddNoteDialogComponent } from './meeting/adapter/dialogs/session-add-note-dialog/session-add-note-dialog.component';
import {TabViewModule} from "primeng/tabview";
import {SkeletonModule} from "primeng/skeleton";
import {MessagesModule} from "primeng/messages";
import {PanelModule} from "primeng/panel";
import {ProgressBarModule} from "primeng/progressbar";
import { TimeTrackerButtonComponent } from './timetracker/adapter.web/time-tracker-button/time-tracker-button.component';
import { TimeTrackerComponent } from './timetracker/adapter.web/time-tracker/time-tracker.component';
import { RunningTimeTrackerComponent } from './timetracker/adapter.web/running-time-tracker/running-time-tracker.component';
import {ToastModule} from "primeng/toast";
import { ParticipantWidgetComponent } from './participant/adapter/web/participant-widget/participant-widget.component';
import { ParticipantPipe } from './participant/adapter/web/participant-widget/participant.pipe';
import {SplitButtonModule} from "primeng/splitbutton";
import { ParticipantOverviewComponent } from './participant/adapter/web/participant-overview/participant-overview.component';
import { MeetingAgendaOverviewComponent } from './meeting/adapter/web/meeting-agenda-overview/meeting-agenda-overview.component';
import { SessionCollaborationComponent } from './collaborate/web/session-collaboration/session-collaboration.component';
import { MeetingSessionShareComponent } from './meeting/adapter/web/meeting-session-share/meeting-session-share.component';
import {OverlayPanelModule} from "primeng/overlaypanel";
import { SearchMeetingsInputComponent } from './meeting/adapter/dialogs/search-meetings-input/search-meetings-input.component';
import {EditorModule} from "primeng/editor";



@NgModule({
  declarations: [WdysDashboardComponent, NewMeetingComponent, CreateParticipantDialogComponent, SearchParticipantComponent, MeetingOverviewComponent, MeetingListComponent, AddSessionComponent, MeetingSessionOverviewComponent, CreateTodoComponent, ViewSessionTodoComponent, ViewMeetingTodoComponent, CreateMeetingNoteComponent, ShowSessionNotesComponent, MeetingListPipe, SessionAddNoteDialogComponent, TimeTrackerButtonComponent, TimeTrackerComponent, RunningTimeTrackerComponent, ParticipantWidgetComponent, ParticipantPipe, ParticipantOverviewComponent, MeetingAgendaOverviewComponent, SessionCollaborationComponent, MeetingSessionShareComponent, SearchMeetingsInputComponent],
    imports: [
        CommonModule,
        WdysRoutingModule,
        InputTextModule,
        FormsModule,
        MenuModule,
        TimelineModule,
        CardModule,
        CalendarModule,
        InputTextareaModule,
        DividerModule,
        ChipsModule,
        AutoCompleteModule,
        DialogModule,
        AvatarModule,
        AvatarGroupModule,
        TooltipModule,
        OrderListModule,
        DataViewModule,
        CheckboxModule,
        ChipModule,
        TableModule,
        BreadcrumbModule,
        ToolbarModule,
        TagModule,
        SidebarModule,
        DropdownModule,
        SpeedDialModule,
        TabViewModule,
        SkeletonModule,
        MessagesModule,
        PanelModule,
        ProgressBarModule,
        ToastModule,
        SplitButtonModule,
        OverlayPanelModule,
        EditorModule
    ],
    providers: [
        {provide: LocationStrategy, useClass: PathLocationStrategy}
    ]
})
export class WdysModule { }
