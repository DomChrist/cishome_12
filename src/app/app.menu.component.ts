import {Component, OnInit} from '@angular/core';
import {CisAuthService} from './system/cis-connector/services/cis-auth-service';
import {DashboardService} from './pages/dashboard/cis-dashboard/dashboard.service';

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


    constructor( private userService: CisAuthService, private dashboard: DashboardService) {
    }

    ngOnInit() {
        const meeting = this.userService.hasRole('cis_meeting');
        const list = this.userService.hasRole('cis_list');
        const nextcloud = this.userService.hasRole('cis_nextcloud');

        this.model = [];

        this.model.push( {label: 'Dashboard' , icon: 'pi pi-home' , routerLink: '/'} );

        this.dashboard.modules
            .filter( f => f.card && f.card.link )
            .map( f => {
                console.log( f.route );
                return {label: f.label , icon:f.icon , routerLink: f.route};
            })
            .forEach( i => this.model.push(i) );

    }
}
