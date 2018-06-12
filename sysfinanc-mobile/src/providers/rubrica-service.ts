import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import {Constantes} from '../app/utilitarios/constantes';

import {HttpServicos} from '../app/utilitarios/HttpServicos';

@Injectable()
export class RubricaService {
    //
    private _url: string = Constantes.URL_BASE + "/contas";

    constructor(private _http: HttpServicos){

    }

    listarRubricas(){
        return this._http.get(this._url);
    }
}