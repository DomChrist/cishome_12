import {Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {CisAuthService} from "../../../system/cis-connector/services/cis-auth-service";
import {Router} from "@angular/router";
import {GoogleService} from "../../../system/google/google.service";
import {Module, ModuleType} from "./cis-dashboard.component";
import {unwrapConstructorDependencies} from "@angular/compiler-cli/src/ngtsc/annotations/src/util";
import {compileUndecoratedClassesWithAngularFeatures} from "@angular/compiler-cli/src/ngtsc/core/src/config";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

    public showMeeting = false;
    public showLists = false;
    public showFuelDialog = false;
    public showWeatherDialog = false;

    public modules: Module[] = [
        {
            label: 'LIST',
            key: 'Lists',
            type: ModuleType.CARD,
            route: ['/app/lists'],
            card : {
                image: '/assets/icons/flaticon/to-do-list.png',
                link: ['/', 'app', 'lists'],
                action : () => {
                    this.router.navigate(['', 'app', 'lists']);
                }
            },
            component: undefined,
            icon: undefined,
            accessible : this.hasListRole,
            offlineSupport : true
        },
        {
            label: 'WDYS',
            key: 'WDYS',
            type: ModuleType.CARD,
            route: ['/app/wdys'],
            card : {
                link: ['/', 'app', 'wdys'],
                image: '/assets/icons/flaticon/conversation.png',
                action : () => {
                    this.router.navigate(['', 'app', 'wdys']);
                }
            },
            component : undefined,
            icon: undefined,
            accessible : this.hasMeetingRole,
            offlineSupport : false
        },
        {
            label: 'SAFE',
            key: 'SAFE',
            type: ModuleType.CARD,
            route: ['/app/safe'],
            card : {
                link: ['/','app','safe'],
                image: '/assets/icons/flaticon/password.png',
                action : ()=>{
                    this.router.navigate(['','app','safe']);
                }
            },
            component: undefined,
            icon: undefined,
            accessible : this.hasSafeRole,
            offlineSupport : false
        },
        {
            label: 'GOOGLE CONNECT',
            key: 'GCONNECT',
            type: ModuleType.CARD,
            route: undefined,
            card : {
                link: undefined,
                image: '/assets/icons/flaticon/google.png',
                action : () => {
                    this.google.toGoogleLogin();
                }
            },
            component: undefined,
            icon: 'pi pi-google',
            accessible : true,
            offlineSupport : false
        },
        {
            key: 'SCHOOL',
            label: 'SCHOOL',
            route: ['/app/school'],
            component: undefined,
            card : {
                link: ['/','app','school'],
                image: '/assets/icons/flaticon/school.png',
                action : () => {
                    this.router.navigate(['','app','school']);
                }
            },
            type: ModuleType.CARD,
            icon: undefined,
            accessible : true,
            offlineSupport : false
        },
        {
            label: 'STATIONS',
            key: 'STATIONS',
            route: undefined,
            component: undefined,
            card: {
                link: undefined,
                image: '/assets/icons/flaticon/fuel-pump.png',
                action : () => {
                    this.showFuelDialog = !this.showFuelDialog;
                }
            },
            type: ModuleType.CARD,
            icon: undefined,
            accessible : true,
            offlineSupport : false
        },
        {
            key: 'WEEK',
            label: 'WEEK',
            type: ModuleType.CARD,
            route: ['/app/weekplan'],
            component : undefined,
            card : {
                image: '/assets/icons/flaticon/schedule.png',
                action : () => {
                    this.router.navigate(['', 'app', 'weekplan']);
                },
                link: ['/', 'app', 'weekplan']
            },
            icon: 'pi pi-calendar-plus',
            accessible : this.hasWeekplanRole,
            offlineSupport : false
        },
        {
            key: 'TIMETABLE',
            label: 'TIMETABLE',
            type: ModuleType.CARD,
            route: ['/app/timesheet'],
            component: undefined,
            card: {
                link: ['/', 'app', 'timetable'],
                image: '/assets/icons/flaticon/time.png',
                action : () => {
                    this.router.navigate(['', 'app', 'timesheet']);
                }
            },
            icon: 'pi pi-clock',
            accessible : this.hasWeekplanRole,
            offlineSupport : false
        },
        {
            key: 'HOMECONTROL',
            label: 'HOME',
            type: ModuleType.CARD,
            route: ['/app/homecontrol'],
            component: undefined,
            card: {
                link: ['/', 'app', 'homecontrol'],
                image: '/assets/icons/flaticon/smarthome.png',
                action : () => {
                    this.router.navigate(['', 'app', 'homecontrol']);
                }
            },
            icon: 'pi pi-home',
            accessible : true,
            offlineSupport : false
        }

    ];



    constructor( private auth: CisAuthService,
                 private google: GoogleService,
                 private router: Router) { }

    get hasMeetingRole(): boolean{
        let r: string[] = this.auth.user.resource_access.account.roles;
        return r.filter( r => r === 'cis_meeting' ).length != 0;
    }

    get hasNextcloudRole(): boolean{
        const r: string[] = this.auth.user.resource_access.account.roles;
        return r.filter( r => r === 'cis_nextcloud' ).length !== 0;
    }

    get hasSafeRole(): boolean{
        const r: string[] = this.auth.user.resource_access.account.roles;
        return r.filter( r => r === 'cis_safe' ).length !== 0;
    }

    get hasWeekplanRole(): boolean{
        const r: string[] = this.auth.user.resource_access.account.roles;
        return r.filter( r => r === 'cis_weekplan' ).length !== 0;
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

}
