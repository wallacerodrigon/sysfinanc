import { Component } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";

export interface ConfirmModel {
  title:string;
  message:string;
}
@Component({  
    selector: 'alerta',
    template: `<div class="container-fluid modal-dialog">
                <div class="modal-content">
                   <div class="modal-header">
                     <button type="button" class="close" (click)="close()" >&times;</button>
                   </div>
                   <div class="modal-body">
                     <h4 class="text-center">{{message}}</h4>
                   </div>
                   <div class="modal-footer">
                     <button type="button" class="btn btn-danger" (click)="close()" >Ok</button>
                   </div>
                 </div>
              </div>`
})
export class AlertaComponent extends DialogComponent<ConfirmModel, boolean> implements ConfirmModel {
  title: string;
  message: string;

  constructor(dialogService: DialogService) {
    super(dialogService);
  }

  public exibirMensagem(mensagem: string): void {
    this.dialogService.addDialog(AlertaComponent, {
        message: mensagem
    });
  }
}