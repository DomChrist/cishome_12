import {Component, OnDestroy, OnInit} from '@angular/core';
import {MeetingService} from "../../../application/service/meeting.service";
import {ActivatedRoute} from "@angular/router";
import {Session} from "../../../domain/meeting-model";
import {Subscription} from "rxjs";
import {MenuItem} from "primeng/api";
import {MeetingNote} from "../../../../meetingnote/domain/meeting-note-model";
import {Participant} from "../../../../participant/domain/model/participant-model";
import {MeetingSessionService} from "../../../application/service/meeting-session.service";

@Component({
  selector: 'app-meeting-session-overview',
  templateUrl: './meeting-session-overview.component.html',
  styleUrls: ['./meeting-session-overview.component.scss']
})
export class MeetingSessionOverviewComponent implements OnInit, OnDestroy {

    public meetingId: string;
    public sessionId: string;

    public session: Session;

    private sub: Subscription;

    public items: MenuItem[];

    public show_description_save_button = false;
    public show_create_meeting_note = false;
    public show_participant_widget = false;

    public commandItems: MenuItem[];

    constructor(private route: ActivatedRoute, private meeting: MeetingService, private sessionService: MeetingSessionService) {
    }


    ngOnInit(): void {
        this.initCommandItems();
        this.route.paramMap.subscribe((m) => {
            this.meetingId = m.get('id');
            this.sessionId = m.get('sessionId');
            this.items = [
                {label: 'DASHBOARD', routerLink: ['/app/wdys']},
                {label: 'MEETING', routerLink: ['/app/wdys/meeting/view', this.meetingId]},
                {label: 'SESSION', routerLink: ['/app/wdys/meeting/view', this.meetingId, 'session', this.sessionId]},
            ];

            this.sub = this.meeting.subscribeOnMeeting(this.meetingId, (list) => {
                this.session = list.session.sessions.filter((s) => s.meetingSessionId === this.sessionId)[0];
            });
        });
    }

    private initCommandItems() {
        this.commandItems = [
            {
                tooltip: 'back',
                icon: 'pi pi-arrow-left',
                routerLink: '../../'
            }, {
                tooltip: 'add new Session',
                icon: 'pi pi-users',
                command: () => {
                    this.show_participant_widget = !this.show_participant_widget;
                    //this.showNewMeetingDialog = !this.showNewMeetingDialog
                    //this.messageService.add({ severity: 'info', summary: 'Add', detail: 'Data Added' });
                }
            },
            {
                tooltip: 'add new Session',
                icon: 'pi pi-refresh',
                command: () => {
                    this.show_create_meeting_note = !this.show_create_meeting_note;
                }
            },
            {
                tooltip: 'add new Session',
                icon: 'pi pi-trash',
                command: () => {
                    this.show_create_meeting_note = !this.show_create_meeting_note;
                    //this.messageService.add({ severity: 'error', summary: 'Delete', detail: 'Data Deleted' });
                }
            },
            {
                tooltip: 'Manage participants',
                icon: 'pi pi-comment',
                command: () => {
                    this.show_create_meeting_note = !this.show_create_meeting_note;
                }
            }
        ];
    }


    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    public selectParticipantForSession(participant:Participant){
        if( participant ){
            this.sessionService.addParticipant(
                this.meetingId,
                this.sessionId,
                participant.id,
                (s:Session)=>{
                    this.session = s;
                }
            )
        }
        this.show_participant_widget = false;
    }

    public updateDescription() {
        this.meeting.updateDescription(this.session, (m) => {
            this.show_description_save_button = false;
        });
    }

    descriptionKeyDown(event: KeyboardEvent) {
        this.show_description_save_button = true;
    }

    handleCreatedNote(event: MeetingNote) {

    }

    get sessionMeeting(){
        return this.meeting.meeting;
    }
}
