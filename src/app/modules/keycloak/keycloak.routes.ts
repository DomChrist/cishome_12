import { Routes, RouterModule } from '@angular/router';
import {ModuleWithProviders, NgModule} from '@angular/core';
import {TokenHandlerComponent} from "./pages/token-handler/token-handler.component";
import {AppMainComponent} from "../../app.main.component";
import {ListDashboardComponent} from "../lists/app/dashboard/view/list-dashboard/list-dashboard.component";
import {ListViewComponent} from "../lists/app/list/view/list-view/list-view.component";
import {GoogleTokenHandlerComponent} from "./pages/google-token-handler/google-token-handler.component";

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', component: TokenHandlerComponent},
            { path: 'google', component: GoogleTokenHandlerComponent}
        ])
    ],
    exports: [RouterModule]
})
export class KeycloakRoutingModule {
}
