import { Component, OnInit } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {CisAuthService} from "../../../system/cis-connector/services/cis-auth-service";
import {CisUser} from "../../../system/cis-connector/model/user";
import {GoogleService} from "../../../system/google/google.service";
import {CisHttpService} from "../../../system/cis-connector/services/cis-http.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-cis-dashboard',
  templateUrl: './cis-dashboard.component.html',
  styleUrls: ['./cis-dashboard.component.css']
})
export class CisDashboardComponent implements OnInit {



  constructor( private auth:CisAuthService, public google:GoogleService, public http: CisHttpService, private router: Router) { }

  public userData: CisUser;

  public showMeeting = false;
  public showLists = false;

  public ready = READY_STATE.NO;

  public modules: Module[];

  ngOnInit(): void {
      this.auth.checkAuth();
      this.userData = this.auth.user;
      this.showMeeting = this.userData.resource_access.account.roles.filter( r=>r === 'cis_meeting' ).length === 1;

      this.ready = READY_STATE.PENDING;
      window.setTimeout( ()=>{
          this.http.ping( ()=>{
              this.ready = READY_STATE.YES;
          } , ()=>{this.ready= READY_STATE.ERROR} )

      } , 1000 );

      this.modules = [
          {
              name: 'Nextcloud',
              icon: 'pi pi-cloud',
              link: [''],
              accessible : this.hasNextcloudRole,
              action : this.nextCloud,
              offlineSupport : false
          },
          {
              name: 'Lists',
              link: ['/','app','list'],
              icon: 'pi pi-list',
              accessible : this.hasListRole,
              action : ()=>{
                  this.router.navigate(['','app','lists']);
              },
              offlineSupport : true
          },
          {
              name: 'WDYS',
              link: ['/','app','wdys'],
              icon: 'pi pi-calendar-plus',
              accessible : this.hasMeetingRole,
              action : ()=>{
                  this.router.navigate(['','app','wdys']);
              },
              offlineSupport : false
          },
          {
              name: 'SAFE',
              link: ['/','app','safe'],
              icon: 'pi pi-shield',
              accessible : this.hasSafeRole,
              action : ()=>{
                  this.router.navigate(['','app','safe']);
              },
              offlineSupport : false
          },
          {
              name: 'SCHOOL',
              link: ['/','app','school'],
              icon: 'pi pi-briefcase',
              accessible : true,
              action : ()=>{
                  this.router.navigate(['','app','school']);
              },
              offlineSupport : false
          },

      ]

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
      let r: string[] = this.auth.user.resource_access.account.roles;
      return r.filter( r=>r === 'cis_meeting' ).length != 0;
  }

  get hasNextcloudRole(): boolean{
      const r: string[] = this.auth.user.resource_access.account.roles;
      return r.filter( r => r === 'cis_nextcloud' ).length !== 0;
  }

  get hasSafeRole(): boolean{
      const r: string[] = this.auth.user.resource_access.account.roles;
      return r.filter( r => r === 'cis_safe' ).length !== 0;
  }

  get hasListRole(): boolean{
      let r: string[] = this.auth.user.resource_access.account.roles;
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

    public name: string;
    public link: string[] = new Array<string>();
    public accessible: boolean;
    public icon: string;
    public offlineSupport: boolean;
    public action: ()=>void;

}
