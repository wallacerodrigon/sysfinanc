import { Component, OnInit } from '@angular/core';
import { DialogComponent } from 'ng2-bootstrap-modal/dist/dialog.component';
import { DialogService } from 'ng2-bootstrap-modal/dist/dialog.service';
import { LancamentoVO } from '../../dominio/vo/lancamento-vo';
import { UtilizacaoLancamentoVO } from '../../dominio/vo/utilizacao-lancamento-vo';
import { LancamentoService } from '../lancamento.service';
import { AlertaComponent } from '../../componentes/mensagens/alert.component';
import { Formatadores } from '../../utilitarios/formatadores';

@Component({
  selector: 'app-visao-usos',
  templateUrl: './visao-usos.component.html',
  styleUrls: ['./visao-usos.component.css']
})
export class VisaoUsosComponent extends DialogComponent<null, null> implements OnInit {

  public idLancamento: number = 0;
  protected totalStr: string = "0,00";
  
  private colunas: string[] = ["Data Utilização", "Núm. Parcela", "Descrição", "Valor"];
  private listagem: Array<UtilizacaoLancamentoVO> = [];

  private tamanhoListagem: number = 0;
  private atributos: Array<string> = ["dataStr", "numeroParcela", "descricao", "valorStr"];
 

  constructor(protected dialogService: DialogService, private lancamentoService: LancamentoService) {
        super(dialogService);
   }

  ngOnInit() {
      this.lancamentoService.listarUsos(this.idLancamento)
          .subscribe(dados => {
            this.listagem = dados;
            this.tamanhoListagem = this.listagem.length;
            this.calcularTotal();
          }, error => {
              new AlertaComponent(this.dialogService).exibirMensagem(error._body);
          })
  }

  private calcularTotal(){
      let total: number = 0.00;
      this.listagem.forEach(vo => {
          total += Formatadores.formataNumero(vo.valorStr);
      })
      this.totalStr = Formatadores.formataMoeda(total);
  }

  fechar(){
    this.close();
  }
}
