import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SaldoPage } from './saldo';

@NgModule({
  declarations: [
    SaldoPage,
  ],
  imports: [
    IonicPageModule.forChild(SaldoPage),
  ],
  exports: [
    SaldoPage
  ]
})
export class SaldoModule {}
