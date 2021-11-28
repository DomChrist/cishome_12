import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CisHttpService} from "../../../../meeting/application/service/cis-http.service";
import {MessageService} from "primeng/api";
import {ParticipantService} from "../../../application/participant.service";

@Component({
  selector: 'app-create-participant-dialog',
  templateUrl: './create-participant-dialog.component.html',
  styleUrls: ['./create-participant-dialog.component.scss']
})
export class CreateParticipantDialogComponent implements OnInit {

  @Input()
  public visible = false;
  @Output()
  public visibleChange: EventEmitter<boolean> = new EventEmitter();

  public cmd: CreateParticipantCommand = new CreateParticipantCommand();


  constructor( private http: CisHttpService, private service: ParticipantService, private message: MessageService) { }

  ngOnInit(): void {
  }

  public predictMail(){
      let mail = '';
      if( this.cmd.firstName ){
          mail = this.formatName( this.cmd.firstName );
      }
      if( this.cmd.lastName ){
        mail = mail + '.' + this.formatName( this.cmd.lastName ) + '@';
      }
      this.cmd.mail = mail;
  }

  private formatName( name:string ){
      name = name.replace("ä" , "ae")
          .replace("ö","oe")
          .replace("ü","ue")
          .replace("Ä","Ae")
          .replace("Ü","Ue")
          .replace("Ö","Oe")
          .toLowerCase();
      return name;
  }

  public save(){
      this.service.newParticipant( this.cmd , ()=>{
          this.message.add( {severity:'success' , summary:' Particpant created '} )
      } , ()=>{
          this.message.add( {severity:'error' , summary:' Particpant could not be created '} )
      });
  }


}

export class CreateParticipantCommand{

    public firstName: string;
    public lastName: string;
    public mail: string;

}
