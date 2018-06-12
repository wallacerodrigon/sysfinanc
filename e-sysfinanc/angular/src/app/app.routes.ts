import {Routes} from '@angular/router';
import {NotFoundComponent} from './shared/components/not-found/not-found.component';
import { LoginComponent } from './modules/login/component/login-component.component';

export const ROUTES: Routes = [
  {
    path: '', children: [
     {path: 'login', component: LoginComponent},
    // {path: 'user', loadChildren: './modules/user/user.module'},
     {path: 'employer', loadChildren: './modules/employer/employer.module#EmployerModule'},
     {path: 'rubrica', loadChildren: './modules/rubricas/rubricas.module#RubricasModule'},
     {path: 'lancamento', loadChildren: './modules/lancamentos/lancamentos.module#LancamentosModule'},
     {path: '', redirectTo: 'login', pathMatch: 'full'},
      {path: '**', component: NotFoundComponent}
    ]
  },
  {path: '**', component: NotFoundComponent}
];
 