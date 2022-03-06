import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SchoolRoutingModule} from "./school.routes";
import { SchoolDashboardComponent } from './school/school-dashboard/school-dashboard.component';
import { MathDashboardComponent } from './math/view/math-dashboard/math-dashboard.component';
import {ButtonModule} from "primeng/button";
import {CardModule} from "primeng/card";
import { PlusComponent } from './math/view/lessons/plus/plus.component';
import { AufgabenComponent } from './math/view/lessons/aufgaben/aufgaben.component';
import { MinusComponent } from './math/view/lessons/minus/minus.component';
import { MalComponent } from './math/view/lessons/mal/mal.component';
import { GeteiltComponent } from './math/view/lessons/geteilt/geteilt.component';
import {FormsModule} from "@angular/forms";
import { CheckComponent } from './math/view/lessons/check/check.component';
import { MixComponent } from './math/view/lessons/mix/mix.component';



@NgModule({
  declarations: [
    SchoolDashboardComponent,
    MathDashboardComponent,
    PlusComponent,
    AufgabenComponent,
    MinusComponent,
    MalComponent,
    GeteiltComponent,
    CheckComponent,
    MixComponent
  ],
    imports: [
        CommonModule,
        SchoolRoutingModule,
        ButtonModule,
        CardModule,
        FormsModule
    ]
})
export class SchoolModule { }
