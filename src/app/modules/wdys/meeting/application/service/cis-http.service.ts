import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {CisAuthService} from "../../../../../system/cis-connector/services/cis-auth-service";
import {MessageService} from "primeng/api";
import {Observable} from "rxjs";
import {environment} from "../../../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CisHttpService {

    constructor(private http: HttpClient, private app: CisAuthService, private msg: MessageService) { }

    public cisGet<T>( url ): Observable<HttpResponse<T>>{
        const uri = environment.cisHome.service  + url;
        return this.http.get<T>( uri , {headers:this.app.createAuthHeader(),observe:'response'});
    }

    public cisPost<T>( url , body: any ){
        const uri = environment.cisHome.service + url;
        return this.http.post<T>( uri  , body , {headers:this.app.createAuthHeader(),observe:'response'});
    }

    public cisPut<T>( url , body: any ){
        const uri = environment.cisHome.service + url;
        return this.http.put<T>( uri  , body , {headers:this.app.createAuthHeader(),observe:'response'});
    }

    public cisDelete<T>( url ){
        const uri = environment.cisHome.service + url;
        return this.http.delete<T>( uri  , {headers:this.app.createAuthHeader(),observe:'response'});
    }

    public is2xx( status: number ):boolean{
        if( status >= 200 && status < 300 )return true;
        return false;
    }

    public success( summary: string , detail:string ){
        this.msg.add( {severity:'success' , summary:summary,detail:detail} );
    }

}
