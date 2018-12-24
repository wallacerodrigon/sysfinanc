import { Component, OnInit } from '@angular/core';
import { LancamentoService } from '../../lancamento.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { RubricaVO } from '../../../dominio/vo/rubrica-vo';
import { RubricaService } from '../../../rubricas/rubrica.service';
import { AlertaComponent } from '../../../componentes/mensagens/alert.component';
import { DialogService } from 'ng2-bootstrap-modal';
import { LancamentosPorRubricaDTO } from '../../../dominio/dto/lancamento-rubrica-dto';

@Component({
  selector: 'app-rel-lancamentos-rubrica',
  templateUrl: './rel-lancamentos-rubrica.component.html',
  styleUrls: ['./rel-lancamentos-rubrica.component.css']
})
export class RelLancamentosRubricaComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;
  private listaRubricas: Array<RubricaVO> = [];
  private rubricaSelecionada: string = "";
  private maxAno: number = new Date().getFullYear() + 3;
  private ano: number = new Date().getFullYear();
  private minAno: number = this.ano -5;
  private listaLancamentosPorMes: Array<LancamentosPorRubricaDTO> = [];
  private totalListado: number = 0.00;
  private dadosGrafico: Array<number> = [];
  private labelsGrafico: Array<string>= ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
  private lineChartType:string = 'line';
  private exibeLegenda: boolean = false;
  

  public graficoOptions: any = {
    responsive: true,
    title: {
      display: true, text: 'Total de Lançamentos por Mês'
    },
  }

  constructor(private lancamentoService: LancamentoService,
              private rubricaService: RubricaService,
              private dialogService: DialogService
    ) { }

  ngOnInit() {
    this.listaRubricas = this.rubricaService.getListaCache();
    this.inicializarGrafico();
  }

  private inicializarGrafico() {
    for(let i = 0; i < 12;i++){
      this.dadosGrafico.push(0.00);
    }    
  }

  private getRubrica(): RubricaVO {
    let rubricas: RubricaVO[] = this.listaRubricas.filter(rubrica => rubrica.descricaoCombo == this.rubricaSelecionada);
    return rubricas != null ? rubricas[0] : null;
  }
  
  private pesquisar(): void {
    if (this.rubricaSelecionada == null || this.rubricaSelecionada == "" || !this.ano ){
        new AlertaComponent(this.dialogService).exibirMensagem('Informe a rubrica e o ano!');
        return;
    }

    if (this.ano < this.minAno || this.ano > this.maxAno){
      new AlertaComponent(this.dialogService).exibirMensagem(`Informe um ano dentro do intervalo ${this.minAno} e ${this.maxAno}`);
      return;
    }
    this.inicializarGrafico();
    this.blockUI.start('Pesquisando Lançamentos. Aguarde!');
    
    let idRubrica: number = this.getRubrica().id;

    /*this.lancamentoService.getRelatorioLancamentosPorRubrica(this.ano, idRubrica)
      .subscribe(retorno => {
        this.listaLancamentosPorMes = retorno
                                      .map(json => LancamentosPorRubricaDTO.associar(json));
        this.totalListado = this.listaLancamentosPorMes
                              .reduce( (prevVal, dto) => prevVal + dto.totalDoMes, 0.00);  
        this.listaLancamentosPorMes.forEach(dto => {
            this.dadosGrafico[dto.mes-1] = dto.totalDoMes;
        })
        this.blockUI.stop();                                                                
      }, error => {
        console.log(error._body);
        this.blockUI.stop();
      })
*/

  }

  private acaoSelecaoRubrica(){
    let descRubrica: string = "";
    if (this.rubricaSelecionada && this.rubricaSelecionada != ""){
        descRubrica = this.rubricaSelecionada.split("[")[0];
    }
    
}  

}
