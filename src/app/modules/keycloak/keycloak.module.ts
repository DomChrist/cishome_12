import { NgModule } from '@angular/core';
import {CommonModule, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { TokenHandlerComponent } from './pages/token-handler/token-handler.component';
import {KeycloakRoutingModule} from "./keycloak.routes";
import {CardModule} from "primeng/card";
import {ProgressBarModule} from "primeng/progressbar";
import { GoogleTokenHandlerComponent } from './pages/google-token-handler/google-token-handler.component';



@NgModule({
  declarations: [TokenHandlerComponent, GoogleTokenHandlerComponent],
    imports: [
        CommonModule,
        KeycloakRoutingModule,
        CardModule,
        ProgressBarModule
    ],
    providers : [
        {provide: LocationStrategy, useClass: PathLocationStrategy}
    ]
})
export class KeycloakModule { }
