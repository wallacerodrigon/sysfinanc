import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Objetivo } from './objetivo';

@NgModule({
  declarations: [
    Objetivo,
  ],
  imports: [
    IonicPageModule.forChild(Objetivo),
  ],
  exports: [
    Objetivo
  ]
})
export class ObjetivoModule {}
