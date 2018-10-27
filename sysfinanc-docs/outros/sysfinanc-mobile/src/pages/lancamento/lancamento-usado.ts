import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import {LancamentoService} from '../../providers/lancamento-service';
import {LancamentoVO} from '../../app/entidades/lancamentoVO';
import {HistoricoUsoVO} from '../../app/entidades/HistoricoUsoVO';

/**
 * Generated class for the Lancamento page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-lancamento-usado',
  templateUrl: 'lancamento-usado.html',
})
export class LancamentoUsadoPage implements OnInit {

    private idLancamento: number;
    public listaUsos: Array<HistoricoUsoVO> = [];
    public total: number = 0.00;

    constructor(private _service: LancamentoService,
            private _alertCtrl: AlertController,
            private _loader: LoadingController,
            private _navParams: NavParams){
        this.idLancamento = _navParams.data.pIdLancamento;
    }

    ngOnInit(){
        this._listarUsos(this.idLancamento);
    }

    private _calcularTotal(){
         this.total = this.listaUsos.reduce( 
          ( valorAnterior, historico ) => valorAnterior + historico.valor, 0 );
    }

    private _listarUsos(idLancamentoOrigem: number){
        let loader = this._loader.create({content: 'Listando usos do lançamento'});
        loader.present();

        this
            ._service
            .listarUsos(idLancamentoOrigem)
            .then(retorno => this.listaUsos = retorno)
            .then(() => {
                this._calcularTotal();
                loader.dismiss();
            })
            .catch(erro => {
                loader.dismiss();

                this._alertCtrl.create({
                    buttons: ['ok'],
                    title:'Erro',
                    subTitle:'Erro ao recuperar a lista de usos'
                }).present();
                
            })
    }
}