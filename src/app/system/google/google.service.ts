import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GoogleService {

  constructor() { }


  public toGoogleLogin(){
      let root = 'https://accounts.google.com/o/oauth2/auth/identifier';
      let redirect_uri = 'http://localhost:4200/token/google';
      let client_id = '178901623500-c541la5kro2pkjp74accoqpejpm80f9v.apps.googleusercontent.com';
      let scope = "openid email profile https://www.googleapis.com/auth/drive";

      let uri = root + '?response_type=code&redirect_uri='+ redirect_uri +'&client_id='+ client_id +'&scope='+ scope +'&access_type=offline';
      console.log(uri);
      location.href = uri;
  }

}
