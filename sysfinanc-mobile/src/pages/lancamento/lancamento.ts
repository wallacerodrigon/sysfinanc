import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import {LancamentoService} from '../../providers/lancamento-service';
import {LancamentoVO} from '../../app/entidades/lancamentoVO';
import {SaldoPage} from '../saldo/saldo';

import {LancamentoUtilizarPage} from './lancamento-utilizar';
import {LancamentoUsadoPage } from './lancamento-usado';
import {LancamentoEdicaoPage } from './lancamento-edicao';

/**
 * Generated class for the Lancamento page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-lancamento',
  templateUrl: 'lancamento.html',
})
export class LancamentoPage implements OnInit {

  public listaLancamentos:  Array<LancamentoVO> = [];
  public tituloJanela: string = '';
  public total: number = 0.00;

  private _dataReferencia: Date;
  private _bolDespesa: boolean;
  private _saldoPage: SaldoPage;
  
  @ViewChild('tblLancamentos') tblLancamentos;  

  constructor(public navCtrl: NavController, 
        public navParams: NavParams, 
        private _service: LancamentoService,
        private _loader: LoadingController,
        private _alertCtrl: AlertController) {
      this._dataReferencia = navParams.data.dataReferencia;
      this._bolDespesa = navParams.data.ehDespesa;
      this._saldoPage = navParams.data.saldoPage;

  }

  ngOnInit() {
      this.atualizarLista();
  }

  atualizarLista(){
      this.recuperarLancamentos(this._dataReferencia, this._bolDespesa);
  }


  recuperarLancamentos(data: Date, ehDespesa: boolean){
      this.tituloJanela = ehDespesa ? 'Despesas' : 'Receitas';
      let loader = this._exibirLoading('Buscando ' + this.tituloJanela+'... Aguarde!');
      loader.present();

      this._service
          .recuperarLancamentos(data, ehDespesa)
          .then(lancamentos => {
            this.listaLancamentos= lancamentos;

            this._calcularTotal();

            loader.dismiss();
          })
          .catch(erro => {
            console.log(erro)
            loader.dismiss();
            this.navCtrl.pop();
          });
  }

  baixar(lancamento: LancamentoVO){
     this._alertCtrl.create({
                buttons: [
                    {
                      text:"Sim",
                      handler:()=>{
                        let loader = this._exibirLoading('Efetuando baixa do lançamento. Aguarde!');
                        loader.present();    

                        this._service.baixarLancamento(lancamento.idLancamento)
                            .then(() => {
                                this._alertCtrl.create({
                                    buttons: [{
                                        text: 'Ok',
                                        handler:()=> {
                                          lancamento.bolPaga = true;
                                          loader.dismiss();
                                        }
                                    }],
                                    title:'Sucesso',
                                    subTitle:'Baixa de lançamento efetuada com sucesso!'
                                }).present();                              
                            })
                            .catch(erro =>{
                                loader.dismiss();
                                this._alertCtrl.create({
                                                buttons: ['ok'],
                                                title:'Erro',
                                                subTitle:'Erro ao baixar esse lançamento!'
                                            }).present()                            })
                      }
                    },
                    {
                      text:"Não",
                      role:'cancel'
                    }
                ],
                title:'Baixa',
                subTitle:'Deseja realmente baixar esse lançamento?',
      })
      .present();   
  }

  private _calcularTotal(): void {
     this.total =  this.listaLancamentos.reduce( 
          ( valorAnterior, lancamento ) => valorAnterior + lancamento.valorVencimento, 0 );
  }

  editar(lancamento: LancamentoVO){
    this.navCtrl.push(LancamentoEdicaoPage, {pLancamento: lancamento});
  }

  private _efetuarExclusao(lancamento: LancamentoVO, indiceItem: number){
    let loader = this._exibirLoading('Efetuando exclusão do lançamento. Aguarde!');
    loader.present();          
    this._service.excluirLancamento(lancamento.idLancamento)
        .then(() => {
            this._alertCtrl.create({
                      buttons: [{
                        text:"Ok",
                        handler: ()=>{
                            
                            this.listaLancamentos.splice(indiceItem, 1);
                            this._calcularTotal();
                            loader.dismiss();
                            this._saldoPage.recuperarSaldo();//default
                        }
                      }],
                      title:'Exclusão',
                      subTitle:'Exclusão efetuada com sucesso!',
            })
            .present();             
        })
        .catch(erro => {
            loader.dismiss();
            this._alertCtrl.create({
                      buttons: ["Ok"],
                      title:'Exclusão',
                      subTitle:'Erro ao efetuar a exclusão. Descrição:'+ erro,
            })
            .present();             
          
        });    
  }

  excluir(lancamento: LancamentoVO, indiceItem: number){
      this._alertCtrl.create({
                buttons: [
                    {
                      text:"Sim",
                      handler:()=>{
                        this._efetuarExclusao(lancamento, indiceItem);
                      }
                    },
                    {
                      text:"Não",
                      role:'cancel'
                    }
                ],
                title:'Exclusão',
                subTitle:'Deseja realmente excluir esse lançamento?',
      })
      .present();    
  }

  usar(lancamento: LancamentoVO){
     this.navCtrl.push(LancamentoUtilizarPage, {pLancamento: lancamento, parent: this});
  }

  recuperarUsos(lancamento: LancamentoVO){
     this.navCtrl.push(LancamentoUsadoPage, {pIdLancamento: lancamento.idLancamento});
  }

  private _exibirLoading(mensagem: string){
      return this._loader.create({
        content: mensagem
      });
          
  }


}
