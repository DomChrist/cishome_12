import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpRequest, HttpResponse} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";
import {CisUser, Group, Keycloak, KeycloakToken} from "../model/user";
import {CryptoService} from "../../crypto/crypto.service";

@Injectable({
  providedIn: 'root'
})
export class CisAuthService {

    private token: string;
    private headers: HttpHeaders;
    public user: CisUser;
    public accessToken: KeycloakToken;

    constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient,
                private msg: MessageService) {
    }

    public checkAuth() {
        if (this.token == null || this.token.length === 0) {
            this.token = localStorage.getItem('cis_access');
        }
        if (this.token === undefined || this.token === null || this.token.length == 0) {
            const url = window.location.href;
            if (url.endsWith('/login') || url.includes("/auth/token") || url.endsWith('/logout') ) {

            } else {
                location.href = environment.cisHome.login;
            }
        }
        this.user = this.userFromToken(this.token);
    }

    public logout(): void {
        localStorage.removeItem('cis_bearer');
        localStorage.removeItem('cis_access');
        localStorage.removeItem('cis_refresh');
        localStorage.removeItem('cis_idtoken');
        this.router.navigate(['logout']);
        this.token = undefined;
    }

    public handleLogin(request) {
        const url = environment.serviceUrl + "/login";
        console.log(request);
        this.http.post(url, request, {observe: 'response'}).subscribe((resp) => {
            const auth = resp.headers.get('Authorization');
            this.token = auth;
            localStorage.setItem('token', this.token);
            this.checkAuth();
            this.router.navigate(['']);
        });
    }

    public login(request): Observable<HttpResponse<any>> {
        const url = environment.serviceUrl + "/auth/login";
        return this.http.post(url, request, {observe: 'response'});
    }

    public createAuthHeader(): HttpHeaders {
        return this.httpHeader;
    }

    get httpHeader(): HttpHeaders {
        this.headers = new HttpHeaders();
        this.headers = this.headers.append("Authorization", this.token);
        return this.headers;
    }

    public loginWithToken( token:Keycloak){
        try{
            localStorage.setItem( "cis_bearer" , JSON.stringify(token));
            localStorage.setItem( "cis_access" , token.access_token );
            localStorage.setItem( "cis_refresh" , token.refresh_token );
            localStorage.setItem( "cis_idtoken" , token.id_token );

            this.accessToken = this.parseToken(token.access_token);
            this.user = this.parseToCis( this.accessToken );
            this.token = token.access_token;
            return true;
        }catch (e){
            return false;
        }
    }

    public parseToken( token: string ): KeycloakToken {
        const t = token.split(".")[1];
        const access: KeycloakToken = <KeycloakToken> JSON.parse(atob( t ));
        return access;
    }

    public parseToCis( k: KeycloakToken ): CisUser {
        let group: Group = {
            id : k.groups[0],
            name : k.groups[0]
        };
        console.log('--keycloak---');
        console.log( k );
        console.log('--keycloak---');


        const  u: CisUser = {
            id: k.sub,
            sub: k.sub,
            group : group,
            name1 : k.given_name,
            name2: k.family_name,
            fullName : k.name,
            userName : k.preferred_username,
            cisgroup : k.cisgroup,
            roles : k.resource_access.cishome.roles,
            phone : '',
            given_name : k.given_name,
            family_name : k.family_name,
            resource_access : k.resource_access
        }

        return u;
    }

    private userFromToken(token) {
        if( token === null || token.length === 0 ) return null;
        let split = token.split(".")[1];
        let json = atob(split);
        return <CisUser> JSON.parse(json);
    }

    public get<T>(url: string): Observable<T> {
        return this.http.get<T>(url, {headers: this.httpHeader});
    }

    public post<T>(url: string, request) {
        return this.http.post<T>(url, request, {headers: this.httpHeader});
    }

    public request(method: string, url: string, body: any) {
        let r = new HttpRequest(method, url, body, {headers: this.httpHeader});
        return r;
    }

    public httpRequest<T>(r: HttpRequest<T>) {
        this.http.request(r);
    }

    public cisGet<T>( url ): Observable<HttpResponse<T>>{
        const uri = environment.cisHome.service  + url;
        return this.http.get<T>( uri , {headers:this.createAuthHeader(),observe:'response'});
    }

    public cisGetDownload<T>( url ): Observable<HttpResponse<T>>{
        const uri = environment.cisHome.service  + url;
        return this.http.get<T>( uri , {headers:this.createAuthHeader(),observe:'response'});
    }

    public cisPost<T>( url , body: any ){
        const uri = environment.cisHome.service + url;
        return this.http.post<T>( uri  , body , {headers:this.createAuthHeader(),observe:'response'});
    }

    public cisPut<T>( url , body: any ){
        const uri = environment.cisHome.service + url;
        return this.http.put<T>( uri  , body , {headers:this.createAuthHeader(),observe:'response'});
    }

    public cisDelete<T>( url ){
        const uri = environment.cisHome.service + url;
        return this.http.delete<T>( uri  , {headers:this.createAuthHeader(),observe:'response'});
    }

    public is2xx( status: number ):boolean{
        if( status >= 200 && status < 300 )return true;
        return false;
    }

    public success( summary: string , detail:string ){
        this.msg.add( {severity:'success' , summary:summary,detail:detail} );
    }

    public hasRole( role:string ): boolean{
        let r: string[] = this.user.resource_access.account.roles;
        return r.filter( r=>r.toLowerCase() === role.toLocaleLowerCase() ).length != 0;
    }


}
