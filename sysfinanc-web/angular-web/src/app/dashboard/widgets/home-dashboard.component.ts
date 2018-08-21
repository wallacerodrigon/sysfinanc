import { Component, OnInit } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
//import { Chart } from 'chart.js';  

@Component({
  selector: 'app-home-dashboard',
  templateUrl: './home-dashboard.component.html',
  styleUrls: ['./home-dashboard.component.css']
})
export class HomeDashboardComponent implements OnInit {

  //ver a api em: https://valor-software.com/ng2-charts/#barChart
  chart = [];
  @BlockUI() blockUI: NgBlockUI;
  protected dataTeste: Date = new Date();

  public lineChartData:Array<any> = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90]
  ];
  public lineChartLabels:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartType:string = 'line';
  
  // Pie
  public pieChartLabels:string[] = ['Download Sales', 'In-Store Sales', 'Mail Sales'];
  public pieChartData:number[] = [300, 500, 100];
  public pieChartType:string = 'pie';
  
 
  public randomizeType():void {
    this.lineChartType = this.lineChartType === 'line' ? 'bar' : 'line';
    this.pieChartType = this.pieChartType === 'doughnut' ? 'pie' : 'doughnut';
  }
 
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }  

  constructor() { }

  ngOnInit() {
      this.blockUI.start('Montando dashboards, aguarde...');
      this.blockUI.stop();
  }

  gerarGrafico(){
    /*this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: [{year:2018, month: 1, day: 1}, {year:2018, month: 1, day: 10}, {year:2018, month: 1, day: 11}],
        datasets: [
          { 
            data: [1,2,3],
            borderColor: "#3cba9f",
            fill: false
          },
          { 
            data: [3,2,1],
            borderColor: "#ffcc00",
            fill: false
          },
        ]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true
          }],
        }
      }
    });    */
  }
}
