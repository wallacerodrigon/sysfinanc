import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import {LancamentoService} from '../../providers/lancamento-service';
import {ResumoVO} from '../../app/entidades/resumoVO';
import {SaldoLancamento} from '../../app/entidades/saldo-lancamento';

/**
 * Generated class for the Resumo page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-resumo',
  templateUrl: 'resumo.html',
})
export class ResumoPage implements OnInit {

  public resumoVO: ResumoVO = new ResumoVO();

  private _dataReferencia: Date;

  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      private _loader: LoadingController,
      public _service: LancamentoService) {

      this._dataReferencia = navParams.data.dataReferencia;
      let saldoDoMes: SaldoLancamento = navParams.data.saldoDoMes;

      this.resumoVO.receitaTotal = saldoDoMes.totalReceita;
      this.resumoVO.despesaTotal = saldoDoMes.totalDespesa;

  }

  ngOnInit(){
      this._buscarResumo();
  }

  _buscarResumo(){
      let loader = this._loader.create({content: 'Buscando resumo. Aguarde!'});
      loader.present();

      return this._service
        .recuperarResumoGeral(this._dataReferencia)
        .then(resumo => {
            // this.resumoVO.despNaoPagas = resumo.despNaoPagas;
            // this.resumoVO.despPagas = resumo.despPagas;

            // this.resumoVO.recNaoPagas = resumo.recNaoPagas;
            // this.resumoVO.recPagas = resumo.recPagas;
            this.resumoVO = resumo;
            loader.dismiss();
        })
        .catch(erro => {
            loader.dismiss();
            console.log(erro);
        })
  }
}
