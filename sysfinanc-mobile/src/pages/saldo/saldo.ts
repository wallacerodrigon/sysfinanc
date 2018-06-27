import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController,  AlertController } from 'ionic-angular';
import {LancamentoService} from '../../providers/lancamento-service';
import {SaldoLancamento} from '../../app/entidades/saldo-lancamento';
import {LancamentoPage} from '../lancamento/lancamento';
import {ResumoPage} from '../resumo/resumo';
import { ModalController, Platform, ViewController } from 'ionic-angular';

/**
 * Generated class for the Saldo page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-saldo',
  templateUrl: 'saldo.html'
})
export class SaldoPage  implements OnInit {

  public dataReferencia: Date = new Date();

  public saldoLancamento: SaldoLancamento;

  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      private _loader: LoadingController,
      private _alertCtrl: AlertController,
      private _servico: LancamentoService,
      public modalCtrl: ModalController) {

    this.dataReferencia.setDate(1);
    this.dataReferencia.setUTCMonth(this.dataReferencia.getUTCMonth()+1);
    this.saldoLancamento = new SaldoLancamento(this.dataReferencia);

  }

  ngOnInit(){
    this._getSaldo();
  }

  recuperarSaldo(tipo: string= 'D'){
    
    if (tipo === 'B'){
        this.dataReferencia.setUTCMonth(this.dataReferencia.getUTCMonth() - 1);
    } else if (tipo === 'F'){
        this.dataReferencia.setUTCMonth(this.dataReferencia.getUTCMonth() + 1);
    } 
    this._getSaldo();
  }

  private _getSaldo(){
    let loader = this._loader.create({
        content: 'Buscando saldo do mês... Aguarde!'
      });
    loader.present(); 

    return this._servico
        .recuperarSaldo(this.dataReferencia)
        .then(saldo => this.saldoLancamento = saldo)
        .then(()=> loader.dismiss())
        .catch(erro => {
            loader.dismiss();
            this._alertCtrl.create({
                buttons: ['ok'],
                title:'Erro',
                subTitle:'Erro ao recuperar o saldo desse mês'
            }).present();
            
        });
      
  }

  exibeDespesas(){
       this.navCtrl.push(LancamentoPage, {dataReferencia: this.dataReferencia, ehDespesa: true, saldoPage: this});
  }

  exibeReceitas(){
       this.navCtrl.push(LancamentoPage, {dataReferencia: this.dataReferencia, ehDespesa: false, saldoPage: this});

  }

  exibeResumo(){
    let modal = this.modalCtrl.create(ResumoPage, {saldoDoMes: this.saldoLancamento, 
                                               dataReferencia: this.dataReferencia, saldoPage: this});
    modal.present();         

  }

}
