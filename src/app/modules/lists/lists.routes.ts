import {  RouterModule } from '@angular/router';
import {ListDashboardComponent} from "./app/dashboard/view/list-dashboard/list-dashboard.component";
import {AppMainComponent} from "../../app.main.component";
import {ListViewComponent} from "./app/list/view/list-view/list-view.component";
import {NgModule} from "@angular/core";
import {ShoppingListViewComponent} from "./app/shopping/components/views/shopping-list-view/shopping-list-view.component";
import {ShoppingAddItemViewComponent} from "./app/shopping/components/views/shopping-add-item-view/shopping-add-item-view.component";
import {ShoppingRootViewComponent} from "./app/shopping/components/views/shopping-root-view/shopping-root-view.component";
import {
    ProductOverviewComponent
} from "./app/shopping/shoppingproducts/adapter/view/product-overview/product-overview.component";
import {
    ShoppingStoreDashboardComponent
} from "./app/shopping/shoppingstores/adapter/view/shopping-store-dashboard/shopping-store-dashboard.component";
import {ListTodoDashboardComponent} from "./app/todo/view/page/list-todo-dashboard/list-todo-dashboard.component";

/*
const routes = [
    { path: 'app/lists', component: AppMainComponent,
        children: [
            {path: 'shopping/:id' , component: ShoppingRootViewComponent , children: [
                    {path: '' , component: ShoppingListViewComponent},
                    {path: 'add' , component: ShoppingAddItemViewComponent}
                ]},
            {path: '' , component: ListDashboardComponent},
            {path: ':id' , component: ListViewComponent},
        ]}];
 */

const shopping = {

}

const routes = [
    { path: '' , component: ListDashboardComponent },
    {path: 'todo' , component: ListTodoDashboardComponent},
    { path: 'shopping' , component: ShoppingRootViewComponent},
    { path: 'shopping/products' , component: ProductOverviewComponent},
    { path: 'shopping/stores' , component: ShoppingStoreDashboardComponent},
    {path: 'shopping/list/:id' , component: ShoppingListViewComponent , children: [
            {path: '' , component: ShoppingListViewComponent},
            {path: 'add' , component: ShoppingAddItemViewComponent}
        ]}
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class ListsRoutingModule {
}
