import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CoreModule} from '../../core/core.module';
import {SharedModule} from '../../shared/shared.module';
import {PersistEmployerComponent} from './component/persist/persist-employer.component';

import {EmployerService} from './service/employer.service';
import {EmployerResolver} from './resolver/employer.resolver';
import {EmployerComponent} from './component/list/employer.component';
import {AuthGuard} from '../../core/auth/auth.guard';

const ROUTES: Routes = [
  {
    path: 'employer', canActivateChild: [AuthGuard],
    data: {
      title: 'Empregadores'
    },
    children: [
      {path: '', component: EmployerComponent},
      {path: 'add', component: PersistEmployerComponent},
      {
        path: 'edit/:id',
        resolve: {
          responseData: EmployerResolver
        },
        component: PersistEmployerComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    CoreModule,
    SharedModule,
    RouterModule.forChild(ROUTES)
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [EmployerComponent, PersistEmployerComponent],
  providers: [EmployerResolver, EmployerService]
})
export class EmployerModule {
}
