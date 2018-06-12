import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RubricaService } from './rubrica.service';
import { Routes } from '@angular/router';

const rotas: Routes = [
  { path: '', 
  //  component: LancamentoOuterLink,
//    canActivate: [AuthGuard],
    children: [

  ]}    
]; 

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  exports: [],
  providers: [RubricaService]
})
export class RubricasModule { }
