import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CoreModule} from '../../core/core.module';
import {SharedModule} from '../../shared/shared.module';

import {AuthGuard} from '../../core/auth/auth.guard';
import {RubricaListComponent} from './component/list/rubrica-list.component';
import {RubricaPersistComponent} from './component/persist/rubrica-persist.component';
import { RubricaResolver } from './resolver/rubricaresolver';
import { RubricaService } from './service/rubrica.service';
import { TipoContaResolver } from './resolver/tipoContaResolver';
import { TipoContaService } from './service/tipo-conta.service';

const ROUTES: Routes = [
  {
    path: 'rubrica', canActivateChild: [AuthGuard],
    data: {
      title: 'Rubricas'
    },
    children: [
      {path: '', component: RubricaListComponent},
      {path: 'add', component: RubricaPersistComponent,
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
      }
    ]
  }
];

@NgModule({
  imports: [
    CoreModule, SharedModule,
    RouterModule.forChild(ROUTES)
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [RubricaListComponent, RubricaPersistComponent],
  providers: [RubricaResolver, RubricaService, TipoContaResolver, TipoContaService]
})
export class RubricasModule { }
