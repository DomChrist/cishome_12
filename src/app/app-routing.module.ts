import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {DashboardDemoComponent} from './demo/view/dashboarddemo.component';
import {FormLayoutDemoComponent} from './demo/view/formlayoutdemo.component';
import {FloatLabelDemoComponent} from './demo/view/floatlabeldemo.component';
import {InvalidStateDemoComponent} from './demo/view/invalidstatedemo.component';
import {PanelsDemoComponent} from './demo/view/panelsdemo.component';
import {OverlaysDemoComponent} from './demo/view/overlaysdemo.component';
import {MediaDemoComponent} from './demo/view/mediademo.component';
import {MenusDemoComponent} from './demo/view/menusdemo.component';
import {MessagesDemoComponent} from './demo/view/messagesdemo.component';
import {MiscDemoComponent} from './demo/view/miscdemo.component';
import {EmptyDemoComponent} from './demo/view/emptydemo.component';
import {ChartsDemoComponent} from './demo/view/chartsdemo.component';
import {FileDemoComponent} from './demo/view/filedemo.component';
import {DocumentationComponent} from './demo/view/documentation.component';
import {AppMainComponent} from './app.main.component';
import {AppNotfoundComponent} from './pages/app.notfound.component';
import {AppErrorComponent} from './pages/app.error.component';
import {AppAccessdeniedComponent} from './pages/app.accessdenied.component';
import {AppLoginComponent} from './pages/app.login.component';
import {InputDemoComponent} from './demo/view/inputdemo.component';
import {ButtonDemoComponent} from './demo/view/buttondemo.component';
import {TableDemoComponent} from './demo/view/tabledemo.component';
import {ListDemoComponent} from './demo/view/listdemo.component';
import {TreeDemoComponent} from './demo/view/treedemo.component';
import {DisplayComponent} from './utilities/display.component';
import {ElevationComponent} from './utilities/elevation.component';
import {FlexboxComponent} from './utilities/flexbox.component';
import {GridComponent} from './utilities/grid.component';
import {IconsComponent} from './utilities/icons.component';
import {WidgetsComponent} from './utilities/widgets.component';
import {SpacingComponent} from './utilities/spacing.component';
import {TypographyComponent} from './utilities/typography.component';
import {TextComponent} from './utilities/text.component';
import {AppCrudComponent} from './pages/app.crud.component';
import {AppCalendarComponent} from './pages/app.calendar.component';
import {AppTimelineDemoComponent} from './pages/app.timelinedemo.component';
import {AppInvoiceComponent} from './pages/app.invoice.component';
import {AppHelpComponent} from './pages/app.help.component';
import {CisDashboardComponent} from './pages/dashboard/cis-dashboard/cis-dashboard.component';
import {AuthGuard} from './system/cis-connector/services/auth.guard';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {path: 'auth/token' , loadChildren: () => import('./modules/keycloak/keycloak.module').then( m => m.KeycloakModule)},
            {path: 'token' , loadChildren: () => import('./modules/keycloak/keycloak.module').then( m => m.KeycloakModule)},
            {
                path: '', component: AppMainComponent,
                children: [
                    {path: '', component: CisDashboardComponent , canActivate:  [AuthGuard]},
                    {path: 'app/lists'  , loadChildren : () => import('./modules/lists/lists.module').then( m => m.ListsModule ) , canActivate:[AuthGuard]},
                    {path: 'app/wdys'  , loadChildren : () => import('./modules/wdys/wdys.module').then( m => m.WdysModule )},
                    {path: 'app/safe'  , loadChildren : () => import('./modules/safe/safe.module').then( m => m.SafeModule )},
                    {path: 'app/school'  , loadChildren : () => import('./modules/school/school.module').then( m => m.SchoolModule )},
                    {path: 'app/weekplan'  , loadChildren : () => import('./modules/weekplan/weekplan.module').then( m => m.WeekplanModule )},
                    {path: 'app/timesheet'  , loadChildren : () => import('./modules/timesheet/timesheet.module').then( m => m.TimesheetModule )},
                    {path: 'app/homecontrol'  , loadChildren : () => import('./modules/home-control/home-control.module').then( m => m.HomeControlModule )},
                    {path: 'uikit/formlayout', component: FormLayoutDemoComponent},
                    {path: 'uikit/floatlabel', component: FloatLabelDemoComponent},
                    {path: 'uikit/invalidstate', component: InvalidStateDemoComponent},
                    {path: 'uikit/input', component: InputDemoComponent},
                    {path: 'uikit/button', component: ButtonDemoComponent},
                    {path: 'uikit/table', component: TableDemoComponent},
                    {path: 'uikit/list', component: ListDemoComponent},
                    {path: 'uikit/tree', component: TreeDemoComponent},
                    {path: 'uikit/panel', component: PanelsDemoComponent},
                    {path: 'uikit/overlay', component: OverlaysDemoComponent},
                    {path: 'uikit/media', component: MediaDemoComponent},
                    {path: 'uikit/menu', component: MenusDemoComponent},
                    {path: 'uikit/message', component: MessagesDemoComponent},
                    {path: 'uikit/misc', component: MiscDemoComponent},
                    {path: 'uikit/charts', component: ChartsDemoComponent},
                    {path: 'uikit/file', component: FileDemoComponent},
                    {path: 'utilities/display', component: DisplayComponent},
                    {path: 'utilities/elevation', component: ElevationComponent},
                    {path: 'utilities/flexbox', component: FlexboxComponent},
                    {path: 'utilities/grid', component: GridComponent},
                    {path: 'utilities/icons', component: IconsComponent},
                    {path: 'utilities/widgets', component: WidgetsComponent},
                    {path: 'utilities/spacing', component: SpacingComponent},
                    {path: 'utilities/typography', component: TypographyComponent},
                    {path: 'utilities/text', component: TextComponent},
                    {path: 'pages/crud', component: AppCrudComponent},
                    {path: 'pages/calendar', component: AppCalendarComponent},
                    {path: 'pages/timeline', component: AppTimelineDemoComponent},
                    {path: 'pages/invoice', component: AppInvoiceComponent},
                    {path: 'pages/help', component: AppHelpComponent},
                    {path: 'pages/empty', component: EmptyDemoComponent},
                    {path: 'documentation', component: DocumentationComponent}
                ]
            },
            {path: 'error', component: AppErrorComponent},
            {path: 'access', component: AppAccessdeniedComponent},
            {path: 'notfound', component: AppNotfoundComponent},
            {path: 'login', component: AppLoginComponent},
            {path: '**', redirectTo: '/notfound'},
        ], {scrollPositionRestoration: 'enabled' , enableTracing : true , useHash: false})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
