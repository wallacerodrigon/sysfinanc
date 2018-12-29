import { Component, OnInit,ViewChild, ElementRef, Output } from '@angular/core';
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
import { UtilObjeto } from '../../utilitarios/util-objeto';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { GeracaoParcelasDto } from '../../dominio/dto/geracao-parcelas-dto';
import { ResumoLancamentosVO } from '../../dominio/vo/resumo-lancamento-vo';

declare var jQuery: any;


@Component({
  selector: 'app-geracao',
  templateUrl: './geracao.component.html',
  styleUrls: ['./geracao.component.css']
})
export class GeracaoComponent implements OnInit {

  @ViewChild("dataVencimento") dataVencimento: ElementRef; 
  @ViewChild("valor") valor: ElementRef;
  @BlockUI() blockUI: NgBlockUI;

  private listaRubricas: Array<RubricaVO> = [];

  private colunas: string[] = ["Descrição", "Vencimento", "Crédito", "Débito", "Meio Pagamento"];
  private listagem: Array<LancamentoVO> = [];

  private tamanhoListagem: number = 0;
  private atributos: Array<string> = ["descricao", "dataVencimentoStr", "valorCreditoStr", "valorDebitoStr", "descFormaPagamento"];
  private totalizadores: Array<string> = ["Total:", "-", "0,00", "0,00", ""];
  private frmGeracao: FormGroup;

  private mudaParaParcial: boolean = false;

  constructor(protected lancamentoService: LancamentoService,
              protected rubricaService: RubricaService,
              private formBuilder: FormBuilder,
              private dialogService: DialogService ) { 

        this.frmGeracao= this.formBuilder.group({
          rubrica: this.formBuilder.control('', Validators.required),
          vencimento: this.formBuilder.control('', Validators.required),
          quantidade: this.formBuilder.control('', Validators.required),
          valor: this.formBuilder.control('', Validators.required),
          descricao: this.formBuilder.control('', Validators.required),
          modoGeracao: this.formBuilder.control('', Validators.required),
          formaPagamento: this.formBuilder.control('', Validators.required),
        });
                            
  } 

  ngOnInit() {
    this.listaRubricas = this.rubricaService.getListaCache();
    this.inicializarControles();
  }

  private listarRubricas(){
    this.blockUI.start('Carregando rubricas...');
    this.rubricaService.listar()
        .subscribe(rubricas => {
          this.listaRubricas = rubricas;
          this.blockUI.stop();
        },
        erro => {
          new AlertaComponent(this.dialogService).exibirMensagem("Erro ao listar as rubricas");
          this.blockUI.stop();
        });
  }

  private getRubrica(rubricaSelecionada: string): RubricaVO {
      let rubricas: RubricaVO[] = this.listaRubricas.filter(rubrica => rubrica.descricaoCombo == rubricaSelecionada);
      return rubricas != null ? rubricas[0] : null;
  }

  protected gerarLancamentos(): void {
      this.blockUI.start('Gerando lançamentos. Aguarde!');    

      let dto : GeracaoParcelasDto = new GeracaoParcelasDto();
      let rubrica: RubricaVO = this.getRubrica(this.frmGeracao.value['rubrica']);
      dto.dataVencimentoStr = UtilData.converterDataUSAToBR(this.frmGeracao.value['vencimento']);
      dto.descricaoParcela= this.frmGeracao.value['descricao'];
      dto.idConta = rubrica.id;
      dto.parcial = this.frmGeracao.value['modoGeracao'] === "S";
      dto.quantidade = this.frmGeracao.value['quantidade'];
      dto.valorVencimento = Formatadores.formataNumero(this.valor.nativeElement.value);
      dto.idFormaPagamento = this.frmGeracao.value['formaPagamento'];
      this.totalizadores = [];
      this.lancamentoService.gerarLancamentosComDto(dto)
          .subscribe(retorno => {
              this.listagem = retorno;

              console.log(this.listagem);

              this.tamanhoListagem = this.listagem.length;

              if (rubrica.despesa){
                this.totalizadores[3]= ""+dto.calcularTotal();
              } else {
                this.totalizadores[2]= ""+dto.calcularTotal();
              }
              this.totalizadores[4]= "";
              this.mudaParaParcial = true;
              this.blockUI.stop();
              if (!dto.parcial){
                this.inicializarControles();             
                new AlertaComponent(this.dialogService).exibirMensagem('Lançamentos gerados com sucesso!');
              }

            },
          error => {
            this.mudaParaParcial = false;
            this.blockUI.stop();
            new AlertaComponent(this.dialogService).exibirMensagem('Erro ao gerar os lançamentos. Detalhes: ' + error._body);
          });
          

  }

  private isCampoInvalido(formControlName: string): boolean {
    return this.frmGeracao.controls[formControlName].touched && this.frmGeracao.controls[formControlName].invalid;
  }

  private inicializarControles(){
    this.frmGeracao.setValue({
      rubrica: '',
      vencimento:  '',
      quantidade:  '',
      valor:  '',
      descricao:  '',
      modoGeracao:  'S',
      formaPagamento:  '13'
     });

  }

  public iniciarNovaGeracao(){
     this.mudaParaParcial = false;
     //no caso de geração dos lançamentos, zera os controles
     if (this.frmGeracao.value['modoGeracao'] === "N"){
       this.inicializarControles();
     }
  } 


}
