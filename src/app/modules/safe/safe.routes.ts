import {  RouterModule } from '@angular/router';
import {AppMainComponent} from "../../app.main.component";
import {NgModule} from "@angular/core";
import {WelcomePageComponent} from "./app/adapter/pages/welcome-page/welcome-page.component";
import {NoteOverviewComponent} from "./app/adapter/pages/note-overview/note-overview.component";

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

const routes = [
    { path: '' , component: WelcomePageComponent },
    { path: 'note/:id' , component: NoteOverviewComponent },
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class SafeRoutingModule {
}
