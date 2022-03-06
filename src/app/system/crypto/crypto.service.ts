import { Injectable } from '@angular/core';
import * as JsEncryptModule from 'jsencrypt';
import {CisAuthService} from "../cis-connector/services/cis-auth-service.";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  private static module: JsEncryptModule.JSEncrypt;

  constructor( private auth: CisAuthService, private http: HttpClient) {
      this.init();
  }

  init(){
      if( !CryptoService.module ){
          console.log('init crypto')
          CryptoService.module = new JsEncryptModule.JSEncrypt( {
              default_key_size : '2048'
          } );
          console.log('key = ' + CryptoService.module.getPublicKeyB64());
          console.log('key = ' + CryptoService.module.getPrivateKey());
      }
  }

  get publicKey(){
      return CryptoService.module.getPublicKeyB64();
  }

  public call(){
      let headers = this.auth.httpHeader;
       const url = environment.cisHome.service + 'keygen/enrypt';
       headers = headers.append('p' , CryptoService.module.getPublicKeyB64());
       headers = headers.set('p' , CryptoService.module.getPublicKeyB64());

       this.http.get<object>(
           url,
           {
               headers : headers,
               observe : "response"
           }
       ).subscribe( (resp) => {
            console.log(resp.body['payload']);
            let decrypt = CryptoService.module.decrypt(resp.body['payload']);
            console.log(decrypt);
       });
    }

    public decrypt<T>( obj:string[] ){
        let json = "";
        for(let s of obj){
            let decrypt = CryptoService.module.decrypt(s);
            if( decrypt ){
                json = json.concat(decrypt);
            }
        }
        console.log("decrypt");
        console.log(json);
        return <T> JSON.parse( json );
    }






}

export class EncryptedPayload{

    payload: string[];

}
