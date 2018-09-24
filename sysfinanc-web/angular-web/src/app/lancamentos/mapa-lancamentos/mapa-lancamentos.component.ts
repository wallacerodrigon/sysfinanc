import { Component, OnInit } from '@angular/core';
import { LancamentoService } from '../lancamento.service';
import { ResumoLancamentosVO } from '../../dominio/vo/resumo-lancamento-vo';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { AlertaComponent } from '../../componentes/mensagens/alert.component';
import { DialogService } from 'ng2-bootstrap-modal';

@Component({
  selector: 'app-mapa-lancamentos',
  templateUrl: './mapa-lancamentos.component.html',
  styleUrls: ['./mapa-lancamentos.component.css']
})
export class MapaLancamentosComponent implements OnInit {

  private ano: number = new Date().getFullYear();
  private anoAtual: number = new Date().getFullYear();
  private minAno: number = this.anoAtual - 5;
  private maxAno: number = this.anoAtual +1;

  @BlockUI() blockUI: NgBlockUI;

  private tamanhoListagem: number = 12;
  private listaMapa: Array<ResumoLancamentosVO> = [];
  private colunas: string[] = ["Mês", "Receitas", "Despesas", "Saldo Final", "Saldo no Banco"];
  private atributos: string[] = ["mes", "totalReceitas", "totalDespesas", "saldoFinal", "valorConciliado"];
  
  constructor(
    private lancamentoService: LancamentoService, 
    private dialogService: DialogService  
    ) { }

  ngOnInit() {
      this.gerarMapa();
  }

  private gerarMapa() {
    this.blockUI.start(`Gerando o mapa do ano ${this.ano}`);
    this.listaMapa = [];
    this.lancamentoService.getMapa(this.ano)
      .subscribe(retorno => {
        this.listaMapa = retorno;
        this.blockUI.stop();
      }, error => {
        this.blockUI.stop();
        new AlertaComponent(this.dialogService).exibirMensagem(error._data);
      });
  }  


}
