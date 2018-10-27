import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Estatistica } from './estatistica';

@NgModule({
  declarations: [
    Estatistica,
  ],
  imports: [
    IonicPageModule.forChild(Estatistica),
  ],
  exports: [
    Estatistica
  ]
})
export class EstatisticaModule {}
