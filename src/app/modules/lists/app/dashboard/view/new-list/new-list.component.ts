import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MessageService} from "primeng/api";
import {environment} from "../../../../../../../environments/environment";
import {CisHttpService} from "../../../../../../system/cis-connector/services/cis-http.service";

@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.css']
})
export class NewListComponent implements OnInit {

  public name = '';
  public shopping = false;

  public supportedListModules = [
      'DEFAULT', 'SHOPPING', 'TODO'
  ];


  @Output()
  public reference = new EventEmitter<string>();

  constructor(private http: CisHttpService, private msg: MessageService) { }

  ngOnInit() {

  }

  private sendNewShopping(){
      const uri = 'list/shopping/cmd/v1/new';
      const request = {
          name : this.name
      };
      this.http.cisPut(uri , request).subscribe( (resp) => {
          if( resp.status >= 200 && resp.status < 300 ){
              this.msg.add( {severity: 'success' , summary: 'Anlage erfolgreich'} );
              this.reference.emit( resp.body[ 'reference' ] );
          } else {
              this.msg.add( {severity: 'warn' , summary: 'Anfrage konnte nicht verarbeitet werden'} );
          }

      });
  }

  private sendDefault(){
      const request = {
          name : this.name
      };
      const uri = 'list/cmd';
      this.http.cisPut(uri, request)
          .subscribe( (body) => {
              if ( body.status >= 200 && body.status < 300 ){
                  this.msg.add( {severity: 'success' , summary : 'Anlage erfolgreich' } );
                  this.reference.emit( body.body[ 'reference' ] );
              } else {
                  this.msg.add( {severity: 'warn' , summary: 'Anfrage konnte nicht verarbeitet werden' } );
              }
          } , error => {
              this.msg.add( {severity: 'error' , summary: 'Anfrage nicht erfolgreich' } );
          } );
  }

  public sendNewCommand( module:string ): void {
     if (module === 'SHOPPING' ){
         this.sendNewShopping();
     } else {
         this.sendDefault();
     }
  }

}
