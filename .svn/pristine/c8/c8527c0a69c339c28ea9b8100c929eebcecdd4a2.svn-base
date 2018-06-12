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
import { UtilObjeto } from '../../utilitarios/util-objeto';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

declare var jQuery: any;

@Component({
  selector: 'app-geracao',
  templateUrl: './geracao.component.html',
  styleUrls: ['./geracao.component.css']
})
export class GeracaoComponent implements OnInit {

  @ViewChild("dataVencimento") dataVencimento: ElementRef; 
  @ViewChild("valorStr") valor: ElementRef;
  @BlockUI() blockUI: NgBlockUI;

  private listaRubricas: Array<RubricaVO> = [];
  protected rubricaSelecionada: string;

  private colunas: string[] = ["Rubrica", "Vencimento", "Valor", "Descrição"];
  private listagem: Array<LancamentoVO> = [];

  private tamanhoListagem: number = 0;
  private atributos: Array<string> = ["descConta", "dataVencimentoStr", "valor", "descricao"];
  private totalizadores: Array<string> = ["", "Total:", "0,00", ""];
  private descricao: string;
  private quantidade: number = 0;
  private frmGeracao: FormGroup;
  private bolParcial: string = 'S';

  constructor(protected lancamentoService: LancamentoService,
              protected rubricaService: RubricaService,
              private formBuilder: FormBuilder,
              private dialogService: DialogService ) { 
        this.frmGeracao= this.formBuilder.group({
          rubrica: this.formBuilder.control('', Validators.required),
        });
                            
  } 

  ngOnInit() {
    jQuery(this.dataVencimento.nativeElement).datepicker();
    this.dataVencimento.nativeElement.value = UtilData.converterToString(new Date());
    this.listarRubricas();
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

  private getRubrica(): RubricaVO {
      let rubricas: RubricaVO[] = this.listaRubricas.filter(rubrica => rubrica.descricaoCombo == this.rubricaSelecionada);
      return rubricas != null ? rubricas[0] : null;
  }

  protected gerarLancamentos(): void {
      let valor: number = Formatadores.formataNumero(this.valor.nativeElement.value);
      let total: number = valor * this.quantidade;
      this.listagem = [];

      this.lancamentoService.gerarLancamentos(this.getRubrica().id, this.dataVencimento.nativeElement.value,
                              this.quantidade, valor, this.bolParcial == 'S')
          .then(retorno => {
            if (this.bolParcial === 'S'){
              this.listagem = retorno;
              this.tamanhoListagem = this.listagem.length;
              this.totalizadores[2]= Formatadores.formataMoeda(total);
            }
          })
          .catch(erro => console.log(erro));

  }

}
