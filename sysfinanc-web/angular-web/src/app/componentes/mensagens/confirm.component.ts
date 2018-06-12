import { Component, Output, EventEmitter } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
export interface ConfirmModel {
  title:string;
  message:string;
}
@Component({  
    selector: 'confirm',
    template: `<div class="modal-dialog">
                <div class="modal-content">
                   <div class="modal-header">
                     <button type="button" class="close" (click)="close()" >&times;</button>
                   </div>
                   <div class="modal-body">
                     <h4 class="text-center">{{message}}</h4>
                   </div>
                   <div class="modal-footer">
                     <button type="button" class="btn btn-primary" (click)="confirma()">Sim</button>
                     <button type="button" class="btn btn-danger" (click)="close()" >Não</button>
                   </div>
                 </div>
              </div>`
})
export class ConfirmComponent extends DialogComponent<ConfirmModel, boolean> implements ConfirmModel {
  title: string;
  message: string;
  onConfirm = new EventEmitter();

  constructor(dialogService: DialogService) {
    super(dialogService);
  }
  confirma() {
    this.result = true;
    this.close();
  }

  public exibirMensagem(mensagem: string): void {
      let disposable = this.dialogService.addDialog(ConfirmComponent, {
            message: mensagem })
            .subscribe(confirmado=> {
                this.onConfirm.emit(confirmado);
            });
        setTimeout(()=>{
            disposable.unsubscribe();
        },10000);  
  }  

}