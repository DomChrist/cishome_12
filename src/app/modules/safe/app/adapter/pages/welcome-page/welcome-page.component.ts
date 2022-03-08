import { Component, OnInit } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import {KeySafeService} from "../../../application/key-safe.service";
import {SecretNote} from "../../../domain/model";

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit{

    notes: SecretNote[];

    title = 'EncryptionDecryptionSample';

    plainText:string;
    encryptText: string;
    encPassword: string;
    decPassword:string;
    conversionEncryptOutput: string;
    conversionDecryptOutput:string;

    constructor(private keySafeService:KeySafeService) {
    }
    //method is used to encrypt and decrypt the text
    convertText(conversion:string) {
        if (conversion=="encrypt") {
            this.conversionEncryptOutput = CryptoJS.AES.encrypt(this.plainText.trim(), this.encPassword.trim()).toString();
        }
        else {
            this.conversionDecryptOutput = CryptoJS.AES.decrypt(this.encryptText.trim(), this.decPassword.trim()).toString(CryptoJS.enc.Utf8);

        }
    }

    ngOnInit(): void {
        this.keySafeService.load( (notes=>{
            this.notes = notes;
        }));
    }

}
