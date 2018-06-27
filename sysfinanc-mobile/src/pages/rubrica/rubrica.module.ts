import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RubricaPage } from './rubrica';
import {RubricaGeracaoPage} from './rubrica-geracao';

@NgModule({
  declarations: [
    RubricaPage, RubricaGeracaoPage
  ],
  imports: [
    IonicPageModule.forChild(RubricaPage),
  ],
  exports: [
    RubricaPage, RubricaGeracaoPage
  ]
})
export class RubricaModule {}
