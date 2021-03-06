import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProcessamentoComponent } from './processamento/processamento.component';
import { ConciliacaoOutletComponent } from './conciliacao-outlet.component';
import { RouterModule,Routes } from '@angular/router';
import { AuthGuard } from '../servicos/auth-guard.service';
import {HomeModule} from '../home/home.module';
import { ComponentesModule } from '../componentes/componentes.module';
import { FormsModule } from '@angular/forms';
import { ConciliacaoServiceService } from './conciliacao-service.service';
import { BlockUIModule } from 'ng-block-ui';
import {NgbModule } from '@ng-bootstrap/ng-bootstrap';

const rotas: Routes = [
  { path: '', 
    component: ConciliacaoOutletComponent,
    canActivate: [AuthGuard],
    children: [
        {path: 'conciliacoes', component: ProcessamentoComponent},
        //{path: 'conciliacao', component: ProcessamentoComponent, canActivate: [AuthGuard]}
  ]}  

];

@NgModule({
  imports: [
    CommonModule, HomeModule,ComponentesModule, FormsModule,BlockUIModule,
    NgbModule.forRoot(),
    RouterModule.forChild(
      rotas
    )    
  ],
  declarations: [ProcessamentoComponent, ConciliacaoOutletComponent],
  exports: [ProcessamentoComponent, ConciliacaoOutletComponent],
  providers: [ConciliacaoServiceService]
})
export class ConciliacaoModule { }
