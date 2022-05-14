import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {MeetingNoteService} from "../../../application/meeting-note.service";
import {MeetingNote} from "../../../domain/meeting-note-model";
import {Subscription} from "rxjs";
import {Session} from "../../../../meeting/domain/meeting-model";

@Component({
  selector: 'app-show-session-notes',
  templateUrl: './show-session-notes.component.html',
  styleUrls: ['./show-session-notes.component.scss']
})
export class ShowSessionNotesComponent implements OnInit , OnDestroy {

  @Input()
  public session: Session;

  @Input()
  public type: string;

  public notes: Array<MeetingNote>;

  private subscription: Subscription;
  private sessionSubscription: Subscription;

  public show_create_meeting_note = false;

  constructor( private note: MeetingNoteService) { }

      ngOnInit(): void {
          this.note.notesStream$.subscribe( note => {
             this.notes = note;
          });
          this.sessionSubscription = this.note.subscribeMeetingTodos().subscribe( r=>this.add(r) );
          this.subscription = this.note.findBySession( this.session.meetingSessionId , (list)=>{
                this.notes = list;
          });
      }

    ngOnDestroy(): void {
      if( this.subscription ) this.subscription.unsubscribe();
      if( this.sessionSubscription) this.sessionSubscription.unsubscribe();
    }

    public add(r: MeetingNote) {
        //this.notes.push( r );
    }


}
