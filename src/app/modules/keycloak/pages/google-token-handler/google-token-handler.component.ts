import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CisHttpService} from "../../../../system/cis-connector/services/cis-http.service";

@Component({
  selector: 'app-google-token-handler',
  templateUrl: './google-token-handler.component.html',
  styleUrls: ['./google-token-handler.component.scss']
})
export class GoogleTokenHandlerComponent implements OnInit {

  //https://accounts.google.com/o/oauth2/auth/identifier?response_type=code&redirect_uri=http://localhost:4200%2Ftoken%2Fgoogle&client_id=178901623500-c541la5kro2pkjp74accoqpejpm80f9v.apps.googleusercontent.com&scope=openid%20email%20profile&access_type=offline


  constructor( private route: ActivatedRoute, private http: CisHttpService) { }

  ngOnInit(): void {
      this.route.queryParamMap.subscribe( map=>{
         let code = map.get('code');
         console.log(code);
         alert(code);
         let request = {
             "code" : code
         }
         this.http.cisPost( 'auth/google/token?code='+code , request ).subscribe( (resp)=>{

         });
      });
  }

}
