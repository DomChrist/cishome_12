import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomePageComponent } from './app/adapter/pages/welcome-page/welcome-page.component';
import {FormsModule} from "@angular/forms";
import {SafeRoutingModule} from "./safe.routes";
import {CardModule} from "primeng/card";
import { NoteOverviewComponent } from './app/adapter/pages/note-overview/note-overview.component';
import {TableModule} from "primeng/table";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {SpeedDialModule} from "primeng/speeddial";
import {DialogModule} from "primeng/dialog";
import {PasswordModule} from "primeng/password";
import {DividerModule} from "primeng/divider";
import {MessageModule} from "primeng/message";



@NgModule({
  declarations: [
    WelcomePageComponent,
    NoteOverviewComponent
  ],
    imports: [
        CommonModule,
        FormsModule,
        SafeRoutingModule,
        CardModule,
        TableModule,
        InputTextModule,
        ButtonModule,
        SpeedDialModule,
        DialogModule,
        PasswordModule,
        DividerModule,
        MessageModule
    ]
})
export class SafeModule { }
