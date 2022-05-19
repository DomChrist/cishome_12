import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
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
  public error: ErrorResponse = undefined;

  constructor( private routes: ActivatedRoute,
               private router: Router,
               private user: CisAuthService,
               private http: HttpClient) { }

  ngOnInit(): void {
      this.value = 0;
      this.text = '';
      this.error = undefined;

      this.routes.queryParamMap.subscribe( (m) => {
         const code = m.get('code');
         if ( code ){
             this.handleCode(code);
         } else {
             this.error = new ErrorResponse();
             this.error.error = 'X101';
             this.error.errorText = 'Missing access code';
             this.text = 'Loginpage need a missing code';
         }
      });
  }

  private handleCode( code: string){
      this.text = 'code received';
      this.countTo(30);
      const input = new FormData();
      input.append('grant_type' , 'authorization_code');
      input.append('code' , code);
      input.append('client_id' , 'account');
      input.append('client_secret' , '3054de8f-bec7-4d4e-9540-eac80157da02');
      input.append('redirect_uri' , code);

      this.withDelay( 2000 , () => {
         this.requestBackend( code );
      });


  }

  private requestBackend( code: string ){
      const host = location.protocol + '//' + location.host + '/auth/token';
      const url = environment.cisHome.service + 'auth/validate/token?code=' + code + '&host=' + host + '&client=' + environment.keycloak.client;

      const request = {
          code,
          grant_type : 'authorization_code',
          client_id : 'account',
          client_secret : '3054de8f-bec7-4d4e-9540-eac80157da02',
          redirect_uri : environment.serviceUrl
      };
      this.text = 'fetch access token';
      this.countTo(60);
      this.withDelay( 1000 , () => {
          this.http.get<Keycloak>( url , {observe: 'response'} )
              .subscribe(
                  (resp) => this.handleSuccess(resp),
                  (e) => this.handleError(e)
              );
      });
  }

  private handleSuccess( resp: HttpResponse<Keycloak> ){
        this.countTo(90);
        this.text = 'Login succesful. Store tokens';
        localStorage.setItem( 'cis_bearer' , JSON.stringify(resp.body));
        localStorage.setItem( 'cis_access' , resp.body.access_token );
        localStorage.setItem( 'cis_refresh' , resp.body.refresh_token );
        localStorage.setItem( 'cis_idtoken' , resp.body.id_token );

        this.countTo(95);
        this.text = 'check stored tokens';
        if ( this.user.loginWithToken( resp.body ) ){
            this.loggedIn = true;
            this.text = 'login successful';
            window.setTimeout( () => {
                this.countTo(100);
                window.setTimeout( () => this.router.navigate(['/']) , 2000 );
            } , 3500);
        } else {
            this.router.navigate(['/']);
        }
  }

    private handleError(e: HttpErrorResponse) {
      console.log(e);
      this.error = new ErrorResponse();
      if( e.error ) {
          this.text = e.error.text;
          this.error.error = e.error.errorCode;
          this.error.errorText = e.error.errorMessage;
          this.error.text = e.error.text;
      } else {
          this.error.text = 'something went wrong';
      }
      this.countTo(0);
    }

    private withDelay( delay: number , func:() => void ){
        window.setTimeout( () => func() , delay );
    }

    private countTo( n: number ){
      console.log( 'count from ' + this.value + 'to ' + n );
      if( this.value >= n ){
          this.value = n;
      } else {
          window.setTimeout( () => {
              this.value++;
              this.countTo( n );
          } , 10 );
      }
      // this.value = n;
      /*
      if( this.value >= n ){
          this.value = n;
      } else {
          while ( this.value <= n ){
              console.log( 'count from ' + this.value + 'to ' + n );
              window.setTimeout( () => this.value = this.value + 1 , 100 );
          }
      }
       */
    }

}

class ErrorResponse{
    error: string;
    errorText: string;
    text: string;
}
