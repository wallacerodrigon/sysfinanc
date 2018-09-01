import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AlertaComponent} from './mensagens/alert.component';
import {ConfirmComponent} from './mensagens/confirm.component';
import {CrudComponente} from './crud-componente/crud-componente.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { BlockUIModule } from 'ng-block-ui';
import { MonetarioPipe } from './pipes/monetario.pipe';
import { DataPipe } from './pipes/data.pipe';
import { FormaPagamentoComponent } from './combos/forma-pagamento/forma-pagamento.component';

@NgModule({
  imports:[FormsModule, CommonModule, NgbModule.forRoot(), BootstrapModalModule, BlockUIModule, ReactiveFormsModule],
  exports: [CrudComponente, AlertaComponent, ConfirmComponent,MonetarioPipe, DataPipe, FormaPagamentoComponent],
  declarations: [AlertaComponent, ConfirmComponent, CrudComponente, MonetarioPipe, DataPipe, FormaPagamentoComponent],
  entryComponents: [AlertaComponent, ConfirmComponent, CrudComponente, FormaPagamentoComponent]
})
export class ComponentesModule { }



