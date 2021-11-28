import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CisHttpService} from "../../../../meeting/application/service/cis-http.service";
import {Participant} from "../../../domain/model/participant-model";

@Component({
  selector: 'app-search-participant',
  templateUrl: './search-participant.component.html',
  styleUrls: ['./search-participant.component.scss']
})
export class SearchParticipantComponent implements OnInit {

  public participantList = new Array<Participant>();

  private _selectedParticipants = new Array<Participant>();

  @Output("participants")
  public participantsChange: EventEmitter<Array<Participant>> = new EventEmitter<Array<Participant>>();



  constructor(private http: CisHttpService) { }

  ngOnInit(): void {
  }

  public search( event ){
      this.http.cisGet<Array<Participant>>('wdys/participant/query/search?q='+event.query).subscribe( (res)=>{
            this.participantList = res.body;
      });
  }


    get selectedParticipants(): Participant[] {
        return this._selectedParticipants;
    }

    set selectedParticipants(value: Participant[]) {
        this._selectedParticipants = value;
        this.participantsChange.emit( value );
    }

    public push(event){
        this.participantsChange.emit( this._selectedParticipants );
  }

  public firstLetter( l:string ){
      return l.charAt(0).toUpperCase();
  }

  @Input("currentParticipants")
  set currentParticipants( p:Array<Participant> ){
      this._selectedParticipants = p;
  }


}
