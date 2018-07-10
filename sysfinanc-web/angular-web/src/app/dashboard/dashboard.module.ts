import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes }  from '@angular/router';
import { HomeDashboardComponent } from './widgets/home-dashboard.component';
import { BlockUIModule } from 'ng-block-ui';

import { HomeModule } from '../home/home.module';
import { DashboardComponents } from './dashboard-components';
import { AuthGuard } from '../servicos/auth-guard.service';
//import { ChartsModule } from 'ng2-charts';

const rotas: Routes = [
  { path: '', 
    component: DashboardComponents,
    canActivate: [AuthGuard],
    children: [
        {path: 'dashboard', component: HomeDashboardComponent},
       // {path: 'dashboard', component: HomeDashboardComponent, canActivate: [AuthGuard]}
  ]
},  
];

@NgModule({
  imports: [
    CommonModule , RouterModule.forChild(rotas), BlockUIModule, HomeModule, //ChartsModule
  ],
  declarations: [HomeDashboardComponent, DashboardComponents],
  exports: [HomeDashboardComponent, DashboardComponents],
  entryComponents: [HomeDashboardComponent,DashboardComponents]
})
export class DashboardModule { }
