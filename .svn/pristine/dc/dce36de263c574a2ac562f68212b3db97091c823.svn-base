import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CoreModule} from '../../core/core.module';
import {SharedModule} from '../../shared/shared.module';
import {UserComponent} from './component/list/user.component';
import {UserService} from './service/user.service';
import {UserDetailComponent} from './component/detail/user-detail.component';
import {UserResolver} from './resolver/user.resolver';
import {AuthGuard} from '../../core/auth/auth.guard';

const ROUTES: Routes = [
  {
    path: 'user', canActivateChild: [AuthGuard],
    data: {
      title: 'Usuários'
    },
    children: [
      {path: '', component: UserComponent},
      {
        path: 'detail',
        children: [{
          path: ':id',
          resolve: {
            user: UserResolver
          },
          component: UserDetailComponent
        }]
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
  declarations: [UserComponent, UserDetailComponent],
  providers: [UserService, UserResolver]
})
export class UserModule {
}
