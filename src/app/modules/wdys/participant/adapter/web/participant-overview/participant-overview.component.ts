import { Component, OnInit } from '@angular/core';
import {ParticipantService} from "../../../application/participant.service";
import {Participant} from "../../../domain/model/participant-model";

@Component({
  selector: 'app-participant-overview',
  templateUrl: './participant-overview.component.html',
  styleUrls: ['./participant-overview.component.scss']
})
export class ParticipantOverviewComponent implements OnInit {

  public participantsList: Participant[];
  public show_create_dialog = false;

  constructor( private service: ParticipantService) { }

  ngOnInit(): void {
      this.participantsList = this.service.list;
  }

  get participants(){
      return this.service.list;
  }


}
