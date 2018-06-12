import {NgModule} from '@angular/core';
import {CoreModule} from '../../core/core.module';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard.component';
import {DashboardService} from './dashboard.service';
import {AuthGuard} from '../../core/auth/auth.guard';

const ROUTES: Routes = [
  {
    path: 'dashboards', component: DashboardComponent, canActivate: [AuthGuard],
    data: {
      title: 'Relatórios'
    }
  }
];

@NgModule({
  imports: [
    CoreModule,
    RouterModule.forChild(ROUTES)
  ],
  providers: [DashboardService],
  declarations: [DashboardComponent]
})
export class DashboardModule {
}
