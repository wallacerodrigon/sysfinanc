import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {RubricaVO} from '../../app/entidades/rubricaVO';
import {RubricaService} from '../../providers/rubrica-service';

@Component({
  selector: 'page-rubrica-geracao',
  templateUrl: 'rubrica-geracao.html',
})
export class RubricaGeracaoPage implements OnInit {

    private _rubrica: RubricaVO = new RubricaVO();

    constructor(private _navParams: NavParams){
        this._rubrica = _navParams.data.pRubrica;
    }

    ngOnInit(){

    }

    get rubrica(){
        return this.rubrica;
    }
}