import { Component, OnInit } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {CisAuthService} from "../../../system/cis-connector/services/cis-auth-service";
import {CisUser} from "../../../system/cis-connector/model/user";
import {GoogleService} from "../../../system/google/google.service";
import {CisHttpService} from "../../../system/cis-connector/services/cis-http.service";
import {Router} from "@angular/router";
import {DashboardService} from "./dashboard.service";

@Component({
  selector: 'app-cis-dashboard',
  templateUrl: './cis-dashboard.component.html',
  styleUrls: ['./cis-dashboard.component.css']
})
export class CisDashboardComponent implements OnInit {



  constructor( public dashboard: DashboardService, private auth: CisAuthService, public google: GoogleService, public http: CisHttpService, private router: Router) { }

  public userData: CisUser;

  public showMeeting = false;
  public showLists = false;
  public showFuelDialog = false;
  public showWeatherDialog = false;

  public ready = READY_STATE.NO;

  public modules: Module[];

  ngOnInit(): void {
      this.auth.checkAuth();
      this.userData = this.auth.user;
      this.showMeeting = this.userData.resource_access.account.roles.filter( r=>r === 'cis_meeting' ).length === 1;

      this.ready = READY_STATE.PENDING;
      if ( sessionStorage.getItem('ready') ){
          this.ready = READY_STATE.YES;
      } else {
          window.setTimeout( () => {
              this.http.ping( () => {
                  this.ready = READY_STATE.YES;
                  sessionStorage.setItem('ready' , READY_STATE.PENDING.toString());
              } , () => {
                  this.ready = READY_STATE.ERROR;
              });

          } , 1000 );
      }


      this.modules = this.dashboard.modules;

  }

  public nextCloud(){
      if( environment.production ){
          window.open('http://cis-home.selfhost.eu:10583/login' , '_blank');
      } else {
          window.open('http://pi4:8086/login' , '_blank');
      }
  }

  get user(){
      return this.auth.user?.given_name;
  }

  get greeting(){
      let date = new Date();
        let hours = date.getHours();
        let greet = '';
        if( hours <= 5 || hours >= 20 ){
            greet = 'Good evening';
        } else if( hours >= 5 && hours < 11 ){
            greet = "Good morning";
        } else {
            greet = "Have a great Day";
        }
        return greet + ', ' + this.user;
  }

  get hasMeetingRole(): boolean{
      let r: string[] = this.auth.user.resource_access.cishome.roles;
      return r.filter( r=>r === 'cis_meeting' ).length != 0;
  }

  get hasNextcloudRole(): boolean{
      const r: string[] = this.auth.user.resource_access.cishome.roles;
      return r.filter( r => r === 'cis_nextcloud' ).length !== 0;
  }

  get hasSafeRole(): boolean{
      const r: string[] = this.auth.user.resource_access.cishome.roles;
      return r.filter( r => r === 'cis_safe' ).length !== 0;
  }

  get hasWeekplanRole(): boolean{
      const r: string[] = this.auth.user.resource_access.cishome.roles;
      return r.filter( r => r === 'cis_weekplan' ).length !== 0;
  }

  get hasListRole(): boolean{
      let r: string[] = this.auth.user.resource_access.cishome.roles;
      let b = r.filter( r=>r === 'cis_list' ).length !== 0;

      if( environment.production === false ){
          console.log(r);
          console.log('has cis_list role ' + b);
      }
      return b;
  }

  get pageReady(){
      return this.ready === READY_STATE.YES;
  }

  get pageError(){
      return this.ready === READY_STATE.ERROR;
  }

  get pagePending(){
      return this.ready === READY_STATE.PENDING;
  }

}

export enum READY_STATE{
    NO,
    PENDING,
    ERROR,
    YES
}

export class Module{

    public label: string;
    public key: string;
    public type: ModuleType;
    public route: string[];
    public accessible: boolean;
    public icon: string;
    public offlineSupport: boolean;
    public component: ComponentModule;
    public card: CardModule;

}

export class ComponentModule{
    name: string;
    showDialog: boolean = false;
}

export class CardModule {
    image: string;
    public link: string[] = new Array<string>();
    public action: () => void;
}

export enum ModuleType{
    COMPONENT,
    CARD
}
