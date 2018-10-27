import { Component,  OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
//import {Chart} from 'chart.js'; 

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
//xemplo do grafico: https://valor-software.com/ng2-charts/

 /* public doughnutChartLabels:string[] = ['Despesas', 'Receitas'];
  public doughnutChartData:number[] = [];
  public doughnutChartType:string = 'doughnut';
 */

  constructor(public navCtrl: NavController) {

  }

  ngOnInit(){
//    this.gerarGrafico();
  }

	gerarGrafico = function(){
    		 let options: any = {
            responsive:true                    
         };

         let percentualReceitas:number = 45;
         let percentualDespesas:number = 55;
         this.doughnutChartData = [percentualDespesas, percentualReceitas];
                          /*{
                              value: percentualReceitas,
                              color:"#00F",
                              highlight: "#FF5A5E",
                              label: "Receitas (%)"
                          },
                          {
                              value: percentualDespesas,
                              color:"#F00",
                              highlight: "#FF5A5E",
                              label: "Despesas (%)"
                          }];*/



	};

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }


}
