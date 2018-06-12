import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CoreModule} from '../../core/core.module';
import {SharedModule} from '../../shared/shared.module';

import { GeracaoComponent } from './component/geracao/geracao.component';
import { ConsultaComponent } from './component/consulta/consulta.component';
import { ConciliacaoComponent } from './component/conciliacao/conciliacao.component';

import { AuthGuard } from '../../core/auth/auth.guard';
import { LancamentoService } from './service/lancamento.service';
import { RubricaResolver } from './resolver/rubrica.resolver';

const ROUTES: Routes = [
  {path: 'geracao', component: GeracaoComponent,
    resolve: {listaRubricas: RubricaResolver}
  },
  {path: 'conciliacao', component: ConciliacaoComponent},
  {path: 'mapa-mensal', component: ConciliacaoComponent},
  {
    path: '', canActivateChild: [AuthGuard],
    data: {
      title: 'Lançamentos'
    },
    children: [
      {path: '', component: ConsultaComponent},
     /* {path: 'add', component: RubricaPersistComponent,
        resolve: {
          tipoContaData: TipoContaResolver
        },
      },
      {
        path: 'edit/:id',
        resolve: {
          responseData: RubricaResolver,
          tipoContaData: TipoContaResolver
        },
        component: RubricaPersistComponent
      }*/
    ]
  }
];

@NgModule({
  imports: [
    CoreModule, SharedModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [GeracaoComponent, ConsultaComponent, ConciliacaoComponent],
  providers: [LancamentoService, RubricaResolver]
})
export class LancamentosModule { }
