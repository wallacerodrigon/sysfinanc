import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Simulacao } from './simulacao';

@NgModule({
  declarations: [
    Simulacao,
  ],
  imports: [
    IonicPageModule.forChild(Simulacao),
  ],
  exports: [
    Simulacao
  ]
})
export class SimulacaoModule {}
