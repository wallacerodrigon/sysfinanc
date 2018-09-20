import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import { DialogComponent } from 'ng2-bootstrap-modal/dist/dialog.component';
import { LancamentoVO } from '../../dominio/vo/lancamento-vo';
import { RubricaVO } from '../../dominio/vo/rubrica-vo';
import { Constantes } from '../../utilitarios/constantes';
import { DialogService } from 'ng2-bootstrap-modal/dist/dialog.service';
import { LancamentoService } from '../lancamento.service';
import { Formatadores } from '../../utilitarios/formatadores';
import { UtilData } from '../../utilitarios/util-data';
import { RubricaService } from '../../rubricas/rubrica.service';
import { AlertaComponent } from '../../componentes/mensagens/alert.component';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

declare var jQuery: any;

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent  extends DialogComponent<null, LancamentoVO> implements OnInit {
 
  @ViewChild("dataVencimento") dataVencimento: ElementRef; 
  @ViewChild("dataFim") dataFim: ElementRef; 
  @ViewChild("valorStr") valor: ElementRef;

  @BlockUI() blockUI: NgBlockUI;

  private lancamento: LancamentoVO = new LancamentoVO();
  private listaRubricas: Array<RubricaVO> = [];
  protected mostraBlocoRepetir: boolean = true;
  protected consideraPago: boolean = false;

  protected rubricaSelecionada: string;
  protected habilitaDataFim: boolean = false;

  constructor(protected dialogService: DialogService, 
              protected lancamentoService: LancamentoService,
              protected rubricaService: RubricaService ) { 
      super(dialogService);
  }

 
  ngOnInit() {
    jQuery(this.dataVencimento.nativeElement).datepicker();
    this.dataVencimento.nativeElement.value = UtilData.converterToString(new Date());
    this.listaRubricas = this.rubricaService.getListaCache();
    this.lancamento.bolPaga = this.consideraPago;

  }

  private getRubrica(): RubricaVO {
      let rubricas: RubricaVO[] = this.listaRubricas.filter(rubrica => rubrica.descricaoCombo == this.rubricaSelecionada);
      return rubricas != null ? rubricas[0] : null;
  }

  private campoEstaInformado(nomeCampo: string): boolean {
      return this.lancamento[nomeCampo] && this.lancamento[nomeCampo] != null && this.lancamento[nomeCampo] != "";
  }

  private isDadosValidos(): boolean {
    let erro: boolean = false;
    if (! this.rubricaSelecionada || this.rubricaSelecionada == '' ){
        erro = true;
    }

    if (! this.valor.nativeElement.value || this.valor.nativeElement.value == ''){
      erro = true;
    }
  
    if (!this.campoEstaInformado('dataVencimentoStr') || 
        !this.campoEstaInformado('descricao') ||
        !this.campoEstaInformado('idFormaPagamento')  ){
          erro = true;
        }

    if (this.habilitaDataFim && !this.campoEstaInformado('dataFimStr')){
      erro = true;
    }

    if (this.consideraPago && !this.lancamento.bolPaga){
      new AlertaComponent(this.dialogService).exibirMensagem("É obrigatório que o lançamento seja marcado como pago!");
      return false;
    }

    if (erro){
      new AlertaComponent(this.dialogService).exibirMensagem("Informe os dados obrigatórios: rubrica, valor, descrição, forma de pagamento e data vencimento. Data fim se marcada a repetição!");
      return false;
    }
    return true;
  }

  salvar(){
    this.lancamento.dataVencimentoStr = this.dataVencimento.nativeElement.value;
    this.lancamento.dataFimStr  = this.mostraBlocoRepetir ? this.dataFim.nativeElement.value : null;
    this.result = null;
    if (! this.isDadosValidos() ){
      return false;
    }
    this.blockUI.start('Salvando Lançamento. Aguarde!');

    this.lancamento.bolPaga = this.lancamento.numDocumento != null && 
                              this.lancamento.numDocumento != null &&
                              this.lancamento.bolPaga == false ? true : this.lancamento.bolPaga;

    this.lancamento.bolConciliado = this.lancamento.numDocumento != null;
    let rubrica: RubricaVO = this.getRubrica();
    if (rubrica == null){
      new AlertaComponent(this.dialogService).exibirMensagem("Rubrica não encontrada");
      return false;      
    }
    if (rubrica.despesa){
      this.lancamento.valorDebitoStr = this.valor.nativeElement.value;
    } else {
      this.lancamento.valorCreditoStr = this.valor.nativeElement.value;
    }
    this.lancamento.idConta = rubrica.id;
    this.lancamento.despesa = rubrica.despesa;
    this.lancamento.descricao = this.lancamento.descricao.toLocaleLowerCase();

    this.lancamentoService.incluir(this.lancamento)
        .then(lancamentoIncluido=> {
          this.blockUI.stop();
          this.result = JSON.parse(lancamentoIncluido._body);
          new AlertaComponent(this.dialogService).exibirMensagem("Registro incluído com sucesso");
          this.close();
        })
        .catch(erro => {
          this.blockUI.stop();
          new AlertaComponent(this.dialogService).exibirMensagem("Erro ao incluir o registro:" + erro._body);
        });

  }  

  private acaoSelecaoRubrica(){
      let descRubrica: string = "";
      if (this.rubricaSelecionada && this.rubricaSelecionada != ""){
          descRubrica = this.rubricaSelecionada.split("[")[0];
      }
      this.lancamento.descricao = descRubrica.toLocaleLowerCase();
  }

  private controlaDataFim(event: any) {
      this.habilitaDataFim = event.target.value === 'S';
      if (this.habilitaDataFim){
        jQuery(this.dataFim.nativeElement).datepicker();
        this.dataFim.nativeElement.value = UtilData.converterToString(new Date());
    
      }
  }
}
