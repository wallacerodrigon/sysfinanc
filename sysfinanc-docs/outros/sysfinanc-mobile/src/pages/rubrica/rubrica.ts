import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {RubricaVO} from '../../app/entidades/rubricaVO';
import {RubricaService} from '../../providers/rubrica-service';

import {RubricaGeracaoPage} from './rubrica-geracao';

/**
 * Generated class for the Rubrica page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-rubrica',
  templateUrl: 'rubrica.html',
})
export class RubricaPage {

  private rubricas: Array<RubricaVO> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private _service: RubricaService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Rubrica');
    this._listarRubricas();
  }

  private _listarRubricas(){
      this._service
        .listarRubricas()
        .then(lista => this.rubricas = lista)
        .catch(erro => console.log(erro));
  }

  abrirGeracao(rubrica: RubricaVO){
    console.log('Abrindo geração 2');
    this.navCtrl.push(RubricaGeracaoPage, {pRubrica: rubrica});
  }

}
