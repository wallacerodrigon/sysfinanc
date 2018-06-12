import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BlockUIModule } from 'ng-block-ui';
import { AcessoNaoAutorizadoComponent } from './acesso-nao-autorizado/acesso-nao-autorizado.component';

import { LoginService } from './login.service';
import {RouterModule, Routes} from '@angular/router';
import { AuthGuard } from '../servicos/auth-guard.service';

const rotas: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'logout', component: LoginComponent},
    {path: 'acesso-invalido', component: AcessoNaoAutorizadoComponent},  
    {path: '', redirectTo: '/login',  pathMatch: 'full'},        
];
 

@NgModule({
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, BlockUIModule, RouterModule.forChild(rotas)

  ],
  declarations: [LoginComponent, AcessoNaoAutorizadoComponent],
  exports: [LoginComponent],
  entryComponents: [LoginComponent, AcessoNaoAutorizadoComponent],
  providers: [LoginService]
})
export class LoginModule { }
