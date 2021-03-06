import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import {Constantes} from '../app/utilitarios/constantes';

import {HttpServicos} from '../app/utilitarios/HttpServicos';
import { AbstractServicos } from './abstract.servicos';
import { RubricaVO } from '../app/entidades/rubricaVO';
import { HttpInterceptor } from './http-interceptor';

@Injectable()
export class RubricaService extends AbstractServicos<RubricaVO> {

    protected uri: string = Constantes.URL_BASE + "/rubricas";

    constructor(public http: HttpInterceptor) { 
        super();
    }
  
    
    public transformar(element: any): RubricaVO {
       let vo: RubricaVO = new RubricaVO();
       Object.assign(vo, element);
       return vo;
    }
}