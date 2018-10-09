import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultaComponent } from './consulta/consulta.component';
import { GeracaoComponent } from './geracao/geracao.component';
import { EdicaoComponent } from './edicao/edicao.component';
import { ComponentesModule } from '../componentes/componentes.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';

import { HomeModule } from '../home/home.module';
import { LancamentoOuterLink } from '../lancamentos/lancamentos-outer-link';
import { LancamentoService } from '../lancamentos/lancamento.service';

import { AuthGuard } from '../servicos/auth-guard.service';
import { RouterModule, Routes } from '@angular/router';
import { UtilizacaoComponent } from './utilizacao/utilizacao.component';
import { VisaoUsosComponent } from './visao-usos/visao-usos.component';
import { UtilizacaoLancamentoVO } from '../dominio/vo/utilizacao-lancamento-vo';
import { CadastroComponent } from './cadastro/cadastro.component';
import { RubricasModule } from '../rubricas/rubricas.module';

import { BlockUIModule } from 'ng-block-ui';
import { MapaLancamentosComponent } from './mapa-lancamentos/mapa-lancamentos.component';
 
const rotas: Routes = [
  { path: '', 
    component: LancamentoOuterLink,
    canActivate: [AuthGuard],
    children: [
        {path: 'lancamentos', component: ConsultaComponent},
        {path: 'lancamentos-geracao', component: GeracaoComponent, canActivate: [AuthGuard]},
        {path: 'mapa-lancamentos', component: MapaLancamentosComponent, canActivate: [AuthGuard]},
  ]}    
];

@NgModule({
  imports: [
    CommonModule,  HomeModule,ComponentesModule,
    FormsModule, RubricasModule,BlockUIModule,
    RouterModule.forChild(rotas), ReactiveFormsModule,
    ChartsModule
  ],
  declarations: [ConsultaComponent, GeracaoComponent, EdicaoComponent, LancamentoOuterLink, 
    UtilizacaoComponent, VisaoUsosComponent, CadastroComponent, MapaLancamentosComponent],
  providers: [LancamentoService],
  entryComponents: [VisaoUsosComponent, UtilizacaoComponent,CadastroComponent,EdicaoComponent],
  exports: [RouterModule, VisaoUsosComponent, UtilizacaoComponent, LancamentoOuterLink]
})
export class LancamentosModule { }
