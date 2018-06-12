import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import {LancamentoService} from '../../providers/lancamento-service';
import {LancamentoVO} from '../../app/entidades/lancamentoVO';
import {LancamentoPage } from '../lancamento/lancamento';


@Component({
    selector: 'page-lancamento-utilizar',
    templateUrl: 'lancamento-utilizar.html'

})
export class LancamentoUtilizarPage {

    private _lancamentoOrigem: LancamentoVO;
    private _parent: LancamentoPage;

    public dataUtilizacao:Date = new Date();
    public valorUtilizado:number;   


    constructor(
            private _navParams: NavParams, 
            private _navCtrl: NavController,
            private _loader: LoadingController,
            private _alertCtrl: AlertController,
            private _service: LancamentoService){
        this._lancamentoOrigem = this._navParams.data.pLancamento;
        this._parent = this._navParams.data.parent;
    }

    registrarUso(){
         let loader = this._exibirLoading('Registrando uso. Aguarde!');
         this._service
             .usarLancamentos(this._lancamentoOrigem.idLancamento, this.dataUtilizacao, this.valorUtilizado)
             .then(() => {
                 loader.dismiss();
                 this._exibirAlertaUsoRegistrado();
              })
                 
             .catch(erro => {
                 loader.dismiss();
                 this._exibirErroRegistro()
              })
    }

    private _exibirAlertaUsoRegistrado(){
        this._alertCtrl.create({
                buttons: [
                       {
                           text: 'Ok',
                           handler:()=>{
                                this._parent.atualizarLista();
                                this._navCtrl.pop();
                           }                           
                       }],
                title:'Sucesso',
                subTitle:'Uso registrado com sucesso!'
            }).present()           
    }

    private _exibirErroRegistro(){
        this._alertCtrl.create({
                buttons: [
                       {
                           text: 'Ok'
                       }],
                title:'Erro',
                subTitle:'Erro ao registrar o uso!'
            }).present()           
    }    

  private _exibirLoading(mensagem: string){
      return this._loader.create({
        content: mensagem
      });
          
  }
    

}