import {HomeControlWidgetComponent} from './adapter/widgets/home-control-widget/home-control-widget.component';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

const routes = [
    { path: '' , component: HomeControlWidgetComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class HomeControlRoutingModule {
}
