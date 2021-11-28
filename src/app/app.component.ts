import {Component, OnInit} from '@angular/core';
import {PrimeNGConfig} from 'primeng/api';
import {CisAuthService} from "./system/cis-connector/services/cis-auth-service.";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent implements OnInit{

    layoutMode = 'static';

    darkMenu = false;

    inputStyle = 'outlined';

    ripple = true;

    compactMode = false;

    constructor(private primengConfig: PrimeNGConfig, private userService: CisAuthService, private route: ActivatedRoute) {}

    ngOnInit() {
        this.primengConfig.ripple = true;
        //this.userService.checkAuth();
    }
}
