import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {ParticipantService} from "../../../application/participant.service";
import {Subscription} from "rxjs";
import {Participant} from "../../../domain/model/participant-model";

@Component({
  selector: 'app-participant-widget',
  templateUrl: './participant-widget.component.html',
  styleUrls: ['./participant-widget.component.scss']
})
export class ParticipantWidgetComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  public participants: Participant[];

  public selectedParticipant: Participant;

  public searchLine = '';

  @Output("onSelect")
  public onSelect = new EventEmitter<Participant>();

  constructor( private service: ParticipantService) { }


  ngOnInit(): void {
      this.subscription = this.service.subscribe( p => {
            console.log(p);
            this.participants = p;
      }).subscribe();
  }

    ngOnDestroy(): void {
    }


    public select( p:Participant ){
        this.unselect();
        p['selected'] = true;
        this.selectedParticipant = p;
    }

    public unselect(){
        for( let p of this.participants ){
            p['selected'] = false;
        }
    }

    public choose(){
      this.onSelect.next( this.selectedParticipant );
    }

    public close(){
      this.onSelect.next( null );
    }

}
