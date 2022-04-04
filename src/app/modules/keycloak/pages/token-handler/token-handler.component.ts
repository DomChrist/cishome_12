import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {Keycloak} from '../../model/keycloak';
import {CisAuthService} from '../../../../system/cis-connector/services/cis-auth-service';

@Component({
  selector: 'app-token-handler',
  templateUrl: './token-handler.component.html',
  styleUrls: ['./token-handler.component.css']
})
export class TokenHandlerComponent implements OnInit {

  public loggedIn = false;
  public text: string;
  public value = 0;

  constructor( private routes: ActivatedRoute,
               private router: Router,
               private user: CisAuthService,
               private http: HttpClient) { }

  ngOnInit(): void {
      this.value = 0;
      this.text = '';
      this.routes.queryParamMap.subscribe( (m) => {
         const code = m.get('code');
         if ( code ){
             this.handleCode(code);
         } else {
             const access = m.get('access');
             this.split(access);
         }
      });
  }

  private split( bearer ){
      const split = bearer.split('.');
      return split;
  }

  private handleCode( code: string){
      this.text = 'code received';
      this.value = 30;
      const input = new FormData();
      input.append('grant_type' , 'authorization_code');
      input.append('code' , code);
      input.append('client_id' , 'account');
      input.append('client_secret' , '3054de8f-bec7-4d4e-9540-eac80157da02');
      input.append('redirect_uri' , code);

      const host = location.protocol + '//' + location.host + '/auth/token';
      const url = environment.cisHome.service + 'auth/validate/token?code=' + code + '&host=' + host;

      const request = {
            code : code,
            grant_type : 'authorization_code',
            client_id : 'account',
            client_secret : '3054de8f-bec7-4d4e-9540-eac80157da02',
            redirect_uri : environment.serviceUrl
        };
      this.text = 'fetch access token';
      this.value = 60;
      this.http.get<Keycloak>( url , {observe: 'response'} ).subscribe( (resp) => {
            localStorage.setItem( 'cis_bearer' , JSON.stringify(resp.body));
            localStorage.setItem( 'cis_access' , resp.body.access_token );
            localStorage.setItem( 'cis_refresh' , resp.body.refresh_token );
            localStorage.setItem( 'cis_idtoken' , resp.body.id_token );

            this.value = 90;
            if ( this.user.loginWithToken( resp.body ) ){
                this.loggedIn = true;
                this.text = 'login successful';
                window.setTimeout( () => {
                    this.value = 100;
                    window.setTimeout( () => this.router.navigate(['/']) , 1000 );
                } , 1500);
            } else {
                this.router.navigate(['/']);
            }

        });

  }

}
