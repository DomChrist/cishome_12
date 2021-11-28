import {Component, OnInit} from '@angular/core';
import {CisAuthService} from "./system/cis-connector/services/cis-auth-service.";

@Component({
    selector: 'app-menu',
    template: `
        <div class="menu-scroll-content">
			<ul class="navigation-menu">
				<li app-menuitem *ngFor="let item of model; let i = index;" [item]="item" [index]="i" [root]="true"></li>
			</ul>
        </div>
    `
})
export class AppMenuComponent implements OnInit {

    public model: any[];


    constructor( private userService: CisAuthService) {
    }

    ngOnInit() {
        const meeting = this.userService.hasRole('cis_meeting');
        const list = this.userService.hasRole('cis_list');
        const nextcloud = this.userService.hasRole('cis_nextcloud');

        this.model = [
            {label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/']}
        ];
        if( meeting ) this.model.push( {label:'WDYS' , icon:'pi pi-calendar' , routerLink:['/app/wdys']} );
        if( list ) this.model.push( {label:'LISTS' , icon:'pi pi-bars' , routerLink:['/app/lists']} );
    }
}
