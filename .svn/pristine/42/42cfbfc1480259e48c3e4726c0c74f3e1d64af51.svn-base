import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from './app.component';
import { AuthGuard } from './servicos/auth-guard.service';
 
const defaultRoutes: Routes = [

//  {path: 'login', component: LoginComponent},
  /*wildcard*/
  {
    path: 'dashboard',
    loadChildren: 'app/dashboard/dashboard.module#DashboardModule',
    data: { state: 'dashboard' },
    canActivate: [AuthGuard]
  },    
  {
    path: 'rubricas',
    loadChildren: 'app/dashboard/dashboard.module#DashboardModule',
    data: { state: 'rubricas' },
    canActivate: [AuthGuard]
  },  
  {
    path: 'conciliacoes',
    loadChildren:  'app/conciliacao/conciliacao.module#ConciliacaoModule',
    data: { state: 'conciliacoes' },
    canActivate: [AuthGuard]
  },  
  {
    path: 'lancamentos',
    loadChildren: 'app/lancamentos/lancamentos.module#LancamentosModule',
    data: { state: 'lancamentos' },
    canActivate: [AuthGuard]
  },      
  { path: '**', redirectTo: '' }
   

];

/*export const routing = RouterModule.forRoot(defaultRoutes, {useHash: true, enableTracing: true});*/
//forRoot apenas no módulo de rotas principal. Nos demais, forChild.
@NgModule({
  imports: [
    RouterModule.forRoot(
      defaultRoutes
     // , { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
})
export class RoutesRoutingModule {}
 