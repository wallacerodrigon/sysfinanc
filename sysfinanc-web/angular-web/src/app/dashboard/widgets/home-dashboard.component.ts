import { Component, OnInit } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { LancamentoService } from '../../lancamentos/lancamento.service';
//import { Chart } from 'chart.js';  

@Component({
  selector: 'app-home-dashboard',
  templateUrl: './home-dashboard.component.html',
  styleUrls: ['./home-dashboard.component.css']
})
export class HomeDashboardComponent implements OnInit {

  //ver a api em: https://valor-software.com/ng2-charts/#barChart

  
  @BlockUI() blockUI: NgBlockUI;
  protected data: Date = new Date();

  private pieChart:string= 'pie';
  private barChartType:string= 'bar';
  private lineChartType:string = 'line';

  protected despesaReceitasMesLabel:string[] = ['Receitas', 'Despesas'];
  protected despesasReceitasMes: Array<any> = [0,0];  

  protected aReceberPagarMesLabel:string[] = ['A Receber', 'A Pagar'];
  protected aReceberPagarData: Array<any> = [0, 0];  

  protected saldoBancarioLabel:Array<any> = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
  protected saldoBancarioData:Array<any> = [0];

  protected despTipoContaLabel: Array<any> = [' ',' '];
  protected despTipoContaData:Array<any>= [0,0];

  public pieDespRecOptions:any = {
    responsive: true,
    title: {
      display: true, text: 'Despesas x Receitas'
    }
  };
  public pieRecPagOptions: any = {
    responsive: true,
    title: {
      display: true, text: 'A Receber x A Pagar'
    }
  }
  public lineSaldoOptions: any = {
    responsive: true,
    title: {
      display: true, text: 'Saldo por mês'
    }
  }
  public tipoContaMesOptions: any = {
    responsive: true,
    title: {
      display: true, text: 'Tipo de Conta no mês'
    }
  }

  public exibeLegenda:boolean = false;
 
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }  

  constructor(protected lancamentoService: LancamentoService) { }

  ngOnInit() {
      this.blockUI.start('Montando dashboards, aguarde...');

      this.lancamentoService.getDashboards(this.data.getMonth(), this.data.getFullYear())
        .subscribe(dados => {
            let mapa: any = dados;
            this.despesasReceitasMes = [mapa.totalEntradas, mapa.totalSaidas];
            this.aReceberPagarData = [mapa.totalPagar, mapa.totalReceber];
            this.saldoBancarioData = mapa.saldosPorMes;
            mapa.tiposContasPorMes.forEach(tc => {
              this.despTipoContaData.push(tc.valor);
              this.despTipoContaLabel.push(tc.nomeTipoConta);
            })
            mapa.saldosPorMes.forEach(tc => {
              this.saldoBancarioData.push(tc.valor);
            })

        })
        

      this.blockUI.stop();
  }

  public pieChartColors:Array<any> = [
    { // azul
      backgroundColor: 'rgba(0,0,255,0.4)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // red
      backgroundColor: 'rgba(255,0,0,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
  ];   
}

