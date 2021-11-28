import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {MessageService} from "primeng/api";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import {CisAuthService} from "./cis-auth-service.";

@Injectable({
  providedIn: 'root'
})
export class CisHttpService {

    constructor(private http: HttpClient, private app: CisAuthService, private msg: MessageService) { }


    public ping( success:()=>void , error:()=>void ){
        const uri = environment.cisHome.service + 'q/health';
        this.http.get<HealthCheck>( uri,{headers:this.app.createAuthHeader(),observe:'response'} ).subscribe( (resp)=>{
            if( resp.status >= 200 && resp.status < 300 ){
                if( resp.body.status === 'UP' ) success();
                return;
            }
            error();
        } , (e)=>{
            error();
        });
    }

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

interface HealthCheck{
    status: string;
}

