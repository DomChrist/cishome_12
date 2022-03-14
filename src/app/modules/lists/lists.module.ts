import { NgModule } from '@angular/core';
import {CommonModule, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {NewListComponent} from "./app/dashboard/view/new-list/new-list.component";
import {ListViewComponent} from "./app/list/view/list-view/list-view.component";
import {AddItemComponent} from "./app/list/view/add-item/add-item.component";
import {FormsModule} from "@angular/forms";
import {ListDashboardComponent} from "./app/dashboard/view/list-dashboard/list-dashboard.component";
import { ShoppingListComponent } from './app/list/view/list-view/shopping-list/shopping-list.component';
import {CardModule} from "primeng/card";
import {SidebarModule} from "primeng/sidebar";
import {ToastModule} from "primeng/toast";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {MessageModule} from "primeng/message";
import {MessagesModule} from "primeng/messages";
import {ListsRoutingModule} from "./lists.routes";
import {SkeletonModule} from "primeng/skeleton";
import {TagModule} from "primeng/tag";
import {RippleModule} from "primeng/ripple";
import {DialogModule} from "primeng/dialog";
import { ListWidgetComponent } from './app/adapter/web/list-widget/list-widget.component';
import {MessageService} from "primeng/api";
import {CheckboxModule} from "primeng/checkbox";
import { ShoppingListViewComponent } from './app/shopping/components/views/shopping-list-view/shopping-list-view.component';
import { ShoppingAddItemViewComponent } from './app/shopping/components/views/shopping-add-item-view/shopping-add-item-view.component';
import { ShoppingRootViewComponent } from './app/shopping/components/views/shopping-root-view/shopping-root-view.component';
import {SpeedDialModule} from "primeng/speeddial";
import { ShoppingItemDetailComponent } from './app/shopping/components/views/shopping-item-detail/shopping-item-detail.component';
import { ShoppingStoreChooserComponent } from './app/shopping/components/views/shopping-add-item-view/shopping-store-chooser/shopping-store-chooser.component';
import { ProductOverviewComponent } from './app/shopping/shoppingproducts/adapter/view/product-overview/product-overview.component';
import { AddShoppingItemComponent } from './app/shopping/shoppinglist/adapter/components/add-shopping-item/add-shopping-item.component';
import { ShoppingItemListViewComponent } from './app/shopping/shoppinglist/adapter/components/shopping-item-list-view/shopping-item-list-view.component';
import { ShoppingStoreDashboardComponent } from './app/shopping/shoppingstores/adapter/view/shopping-store-dashboard/shopping-store-dashboard.component';



@NgModule({
  declarations: [
      NewListComponent,
      ListViewComponent,
      AddItemComponent,
      ListDashboardComponent,
      ShoppingListComponent,
      ListWidgetComponent,
      ShoppingListViewComponent,
      ShoppingAddItemViewComponent,
      ShoppingRootViewComponent,
      ShoppingItemDetailComponent,
      ShoppingStoreChooserComponent,
      ProductOverviewComponent,
      AddShoppingItemComponent,
      ShoppingItemListViewComponent,
      ShoppingStoreDashboardComponent
  ],
    imports: [
        CommonModule,
        ListsRoutingModule,
        CardModule,
        SidebarModule,
        FormsModule,
        ToastModule,
        InputTextModule,
        ButtonModule,
        MessageModule,
        MessagesModule,
        SkeletonModule,
        TagModule,
        RippleModule,
        DialogModule,
        CheckboxModule,
        SpeedDialModule
    ],
    providers : [
        {provide: LocationStrategy, useClass: PathLocationStrategy},
        MessageService
    ]
})
export class ListsModule { }
