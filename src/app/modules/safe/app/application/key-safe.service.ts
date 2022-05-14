import { Injectable } from '@angular/core';
import {CisHttpService} from "../../../../system/cis-connector/services/cis-http.service";
import {SecretItem, SecretNote} from "../domain/model";
import * as CryptoJS from 'crypto-js';
import {CryptoService, EncryptedPayload} from "../../../../system/crypto/crypto.service";
import {HttpHeaders} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class KeySafeService {

  constructor(private http: CisHttpService, private crypto:CryptoService) { }


  public encrypt(){
  }

  public load( success:( notes:SecretNote[] )=>void ){
      const url = 'secret/notes';
      let h = new HttpHeaders();
        h = h.set('p' , this.crypto.publicKey);
      this.http.cisGet<EncryptedPayload>( url , h ).subscribe( resp=>{
          console.log(resp.body);
          let r: SecretNote[] = this.crypto.decrypt<SecretNote[]>( resp.body.payload);
          success(r);
      })
  }

  public loadById( id:string , success:(note:SecretNote)=>void ){
      const url = 'secret/note/' + id;
      this.http.cisGet<SecretNote>( url ).subscribe( resp=>{
          success(resp.body);
      });

  }

  public addItem( note: SecretNote, description:string , secret: string, pw: string ){
      const s = CryptoJS.AES.encrypt(secret.trim(), pw.trim()).toString();
      const url = "secret/note/" + note.id + "/item";
      const request = {
          description : description,
          secret : s
      }
      this.http.cisPut( url,request ).subscribe();
  }

  public addNote( name: string , success:(note: SecretNote) => void ){
      const request = {
          name
      };
      this.http.cisPost<SecretNote>( 'secret/note' , request ).subscribe( (resp) => {
          success( resp.body );
      });
  }

    decrypt(i: SecretItem, pw: string): string {
        let decrypted = CryptoJS.AES.decrypt(i.secret.trim(), pw.trim()).toString(CryptoJS.enc.Utf8);
        if( !decrypted ) throw new Error("");
        return decrypted;
    }
}
