import {  RouterModule } from '@angular/router';
import {AppMainComponent} from "../../app.main.component";
import {NgModule} from "@angular/core";
import {SchoolDashboardComponent} from "./school/school-dashboard/school-dashboard.component";
import {MathDashboardComponent} from "./math/view/math-dashboard/math-dashboard.component";
import {PlusComponent} from "./math/view/lessons/plus/plus.component";
import {MinusComponent} from "./math/view/lessons/minus/minus.component";
import {MalComponent} from "./math/view/lessons/mal/mal.component";
import {GeteiltComponent} from "./math/view/lessons/geteilt/geteilt.component";
import {MixComponent} from "./math/view/lessons/mix/mix.component";
import {SpeedMathComponent} from "./math/view/lessons/speed-math/speed-math.component";

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
    { path: '' , component: SchoolDashboardComponent },
    { path: 'math' , component: MathDashboardComponent , children : [
            {path:'plus' , component: PlusComponent},
            {path:'minus' , component: MinusComponent},
            {path:'mal' , component: MalComponent},
            {path:'geteilt' , component: GeteiltComponent},
            {path:'mix' , component: MixComponent},
            {path:'speed' , component: SpeedMathComponent}
        ]
    },
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class SchoolRoutingModule {
}
