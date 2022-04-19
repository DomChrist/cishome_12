import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeControlWidgetComponent } from './adapter/widgets/home-control-widget/home-control-widget.component';
import {HomeControlRoutingModule} from "./home-control.routes";
import {CardModule} from "primeng/card";
import {DividerModule} from "primeng/divider";



@NgModule({
  declarations: [
    HomeControlWidgetComponent
  ],
    imports: [
        CommonModule,
        HomeControlRoutingModule,
        CardModule,
        DividerModule
    ],
  exports : [
      HomeControlWidgetComponent
  ]
})
export class HomeControlModule { }
