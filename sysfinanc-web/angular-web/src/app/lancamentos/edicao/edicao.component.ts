import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { LancamentoService } from '../lancamento.service';
import { Constantes } from '../../utilitarios/constantes';
import { LancamentoVO } from '../../dominio/vo/lancamento-vo';
import { Formatadores } from '../../utilitarios/formatadores';
import { AlertaComponent } from '../../componentes/mensagens/alert.component';
import { UtilObjeto } from '../../utilitarios/util-objeto';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { AlteracaoLancamentoDTO } from '../../dominio/dto/AlteracaoLancamentoDTO';

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

  public lancamento: AlteracaoLancamentoDTO = new AlteracaoLancamentoDTO();
  public lancamentoOld: LancamentoVO = new LancamentoVO();

  protected estaPago: boolean = false;

  constructor(protected dialogService: DialogService, 
        protected lancamentoService: LancamentoService ) { 
      super(dialogService);
  }

 
  ngOnInit() {
    jQuery(this.dataVencimento.nativeElement).datepicker();

    this.dataVencimento.nativeElement.value = this.lancamentoOld.dataVencimentoStr;
    this.valor.nativeElement.value = Formatadores.formataMoeda(this.lancamentoOld.valor);
    this.estaPago = this.lancamentoOld.bolPaga;
    this.lancamento.idLancamento = this.lancamentoOld.id;
    this.lancamento.idFormaPagamento = this.lancamentoOld.idFormaPagamento;
    this.lancamento.descricao = this.lancamentoOld.descricao;

  }

  salvar(){
      
      if (this.dataVencimento.nativeElement.value == "" || this.valor.nativeElement.value == null ||
          this.valor.nativeElement.value == "" || this.lancamento.idFormaPagamento == null ||
          this.lancamento.descricao.trim().length == 0 ){
         new AlertaComponent(this.dialogService).exibirMensagem("Informe os dados obrigatórios");
         return false;
      }

      this.blockUI.start('Salvando Lançamento. Aguarde!');
      this.lancamento.bolPago= this.lancamento.numDocumento != null && 
                                this.lancamento.bolPago == false ? true : this.lancamento.bolPago;
      this.lancamento.numDocumento = this.lancamento.numDocumento != null ? this.lancamento.numDocumento.trim() : null;
      this.lancamento.dataVencimento = this.dataVencimento.nativeElement.value;
      this.lancamento.valor = Formatadores.formataNumero(this.valor.nativeElement.value);
      this.lancamento.descricao = this.lancamento.descricao.toLocaleLowerCase().trim();
      
      this.lancamentoService.alterarLancamento(this.lancamento)
          .then(()=> {
            new AlertaComponent(this.dialogService).exibirMensagem("Registro alterado com sucesso");
            this.blockUI.stop();
            this.result = this.lancamentoOld;
            this.close();
          })
          .catch(erro => {
            this.blockUI.stop();
            this.result = null;
            new AlertaComponent(this.dialogService).exibirMensagem("Erro ao alterar o registro:" + erro._body);
          });

  }

}
