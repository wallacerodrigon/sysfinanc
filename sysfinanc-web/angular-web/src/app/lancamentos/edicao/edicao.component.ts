import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { LancamentoService } from '../lancamento.service';
import { Constantes } from '../../utilitarios/constantes';
import { LancamentoVO } from '../../dominio/vo/lancamento-vo';
import { Formatadores } from '../../utilitarios/formatadores';
import { AlertaComponent } from '../../componentes/mensagens/alert.component';
import { UtilObjeto } from '../../utilitarios/util-objeto';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

declare var jQuery: any;

@Component({
  selector: 'app-edicao',
  templateUrl: './edicao.component.html',
  styleUrls: ['./edicao.component.css']
})
export class EdicaoComponent extends DialogComponent<null, LancamentoVO> implements OnInit {
 
  @ViewChild("dataVencimento") dataVencimento: ElementRef;
  @ViewChild("valorStr") valor: ElementRef;
  @BlockUI() blockUI: NgBlockUI;  

  public lancamento: LancamentoVO = new LancamentoVO();
  public lancamentoOld: LancamentoVO = new LancamentoVO();

  protected estaPago: boolean = false;

  constructor(protected dialogService: DialogService, 
        protected lancamentoService: LancamentoService ) { 
      super(dialogService);
  }

 
  ngOnInit() {
    jQuery(this.dataVencimento.nativeElement).datepicker();
    UtilObjeto.transformar(this.lancamentoOld, this.lancamento);

    this.dataVencimento.nativeElement.value = this.lancamento.dataVencimentoStr;
    this.valor.nativeElement.value = Formatadores.formataMoeda(this.lancamento.valor);
    this.estaPago = this.lancamento.bolPaga;


  }


  salvar(){
      
      if (this.lancamento.dataVencimentoStr == "" || this.valor.nativeElement.value == null ||
          this.valor.nativeElement.value == "" || this.lancamento.idFormaPagamento == null ||
          this.lancamento.descricao.trim().length == 0 ){
         new AlertaComponent(this.dialogService).exibirMensagem("Informe os dados obrigatórios");
         return false;
      }

      this.blockUI.start('Salvando Lançamento. Aguarde!');
      this.lancamento.bolPaga = this.lancamento.numDocumento != null && 
                                this.lancamento.bolPaga == false ? true : this.lancamento.bolPaga;
      this.lancamento.numDocumento = this.lancamento.numDocumento != null ? this.lancamento.numDocumento.trim() : null;
      this.lancamento.dataVencimentoStr = this.dataVencimento.nativeElement.value;
      this.lancamento.bolConciliado = this.lancamento.numDocumento != null;
      if (this.lancamento.despesa){
        this.lancamento.valorDebitoStr = this.valor.nativeElement.value;
      } else {
        this.lancamento.valorCreditoStr = this.valor.nativeElement.value;
      }
      this.lancamento.valor = Formatadores.formataNumero(this.valor.nativeElement.value);
      this.lancamento.descricao = this.lancamento.descricao.toLocaleLowerCase().trim();
      
      this.lancamentoService.alterar(this.lancamento)
          .then(()=> {
            new AlertaComponent(this.dialogService).exibirMensagem("Registro alterado com sucesso");
            this.blockUI.stop();
            this.result = this.lancamento;
            this.close();
          })
          .catch(erro => {
            this.blockUI.stop();
            this.result = null;
            new AlertaComponent(this.dialogService).exibirMensagem("Erro ao alterar o registro:" + erro._body);
          });

  }

}
