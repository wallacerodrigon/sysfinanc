import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LancamentoPage } from './lancamento';

import { LancamentoEdicaoPage } from './lancamento-edicao';
import { LancamentoUsadoPage } from './lancamento-usado';
import { LancamentoUtilizarPage } from './lancamento-utilizar';

@NgModule({
  declarations: [
    LancamentoPage,LancamentoEdicaoPage, LancamentoUsadoPage, LancamentoUtilizarPage
  ],
  imports: [
    IonicPageModule.forChild(LancamentoPage),
  ],
  entryComponents:[
    LancamentoPage, LancamentoEdicaoPage, LancamentoUsadoPage, LancamentoUtilizarPage
  ],
  exports: [
    LancamentoPage, LancamentoEdicaoPage, LancamentoUsadoPage, LancamentoUtilizarPage
  ]
})
export class LancamentoModule {}
