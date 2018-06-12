import { Injectable } from "@angular/core";
import { AbstractServicos } from "../servicos/abstract.servicos";
import { HttpInterceptor } from "../servicos/http-interceptor";
import { RubricaVO } from "../dominio/vo/rubrica-vo";
import { UtilObjeto } from "../utilitarios/util-objeto";

@Injectable()
export class RubricaService extends AbstractServicos<RubricaVO> {

    protected uri: string = '/rubricas';
    
    constructor(protected http: HttpInterceptor) { 
        super();
    }

    public transformar(element: any): RubricaVO {
        return UtilObjeto.transformar(element, new RubricaVO());
    }
}