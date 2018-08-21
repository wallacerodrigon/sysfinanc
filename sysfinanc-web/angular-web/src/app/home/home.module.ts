import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home/home.component';
import { RouterModule, Routes }  from '@angular/router';
import { BlockUIModule } from 'ng-block-ui';
import {AuthGuard} from '../servicos/auth-guard.service';
import {LoginComponent} from '../login/login/login.component';
import { HomeOutletComponent } from './home-outlet.component';
import {ComponentesModule} from '../componentes/componentes.module';

const rotas: Routes = [
    {path: '', 
      component: HomeOutletComponent,
      children: [
          {path: '', component: HomePageComponent},
          {path: 'home', component: HomePageComponent}
      ]
    },
];

@NgModule({
  imports: [
    CommonModule , 
    BlockUIModule,
    ComponentesModule,
    RouterModule.forChild(rotas), 
  ],
  declarations: [HomePageComponent,HomeOutletComponent],
  exports: [HomePageComponent,HomeOutletComponent]
})
export class HomeModule { }
