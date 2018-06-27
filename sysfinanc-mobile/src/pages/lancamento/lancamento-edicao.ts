import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import {LancamentoService} from '../../providers/lancamento-service';
import {LancamentoVO} from '../../app/entidades/lancamentoVO';


/**
 * Generated class for the Lancamento page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-lancamento-edicao',
  templateUrl: 'lancamento-edicao.html',
})
export class LancamentoEdicaoPage implements OnInit {

    public lancamentoEditar: LancamentoVO;

    constructor(
        private _navCtrl: NavController,
        private _navParams: NavParams,
        private _service: LancamentoService,
        private _alertCtrl: AlertController,
        private _loader: LoadingController
    ){  
        this.lancamentoEditar = this._navParams.data.pLancamento;
    }

    ngOnInit(){}

    salvarEdicao(){

        if (this._isNaoInformado(this.lancamentoEditar.descricao) || 
            this._isNaoInformado(this.lancamentoEditar.dataVencimento) || 
            this._isNaoInformado(this.lancamentoEditar.valorVencimento)
        ){
            this._alertCtrl.create({
                buttons:["Ok"],
                title: 'Dados inválidos',
                subTitle: 'É necessário informar todos os dados!'
            })
            .present();
            return false;
        }

        let loader = this._loader.create({content: 'Salvando lançamento. Aguarde!'});
        loader.present();

        this._service
            .salvarLancamento(this.lancamentoEditar)
            .then(()=>{
                loader.dismiss();

                this._alertCtrl.create({
                    buttons:["Ok"],
                    title: 'Dados salvos',
                    subTitle: 'Lançamento salvo com sucesso!'
                })
                .present();                
                this._navCtrl.pop()
            })
            .catch(erro => {
                loader.dismiss();

                this._alertCtrl.create({
                    buttons:["Ok"],
                    title: 'Erro',
                    subTitle: 'Ocorreu um erro ao salvar o lançamento: ' + erro
                })
                .present();  
            });
    }

    private _isNaoInformado(valor: any){
        return valor === undefined || valor === null || valor === "";
    }

}