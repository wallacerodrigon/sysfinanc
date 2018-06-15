import { Injectable } from "@angular/core";
import { AbstractServicos } from "../servicos/abstract.servicos";
import { HttpInterceptor } from "../servicos/http-interceptor";
import { RubricaVO } from "../dominio/vo/rubrica-vo";
import { UtilObjeto } from "../utilitarios/util-objeto";

@Injectable()
export class RubricaService extends AbstractServicos<RubricaVO> {

    protected uri: string = '/rubricas';

    private NOME_CACHE: string = "rubricas";
    
    constructor(protected http: HttpInterceptor) { 
        super();
    }

    public transformar(element: any): RubricaVO {
        return UtilObjeto.transformar(element, new RubricaVO());
    }

    public listarParaCache(): void {
        this.listar()
            .subscribe(rubricas => localStorage.setItem(this.NOME_CACHE, JSON.stringify(rubricas)));
    }

    public getListaCache(): Array<RubricaVO> {
        return JSON.parse(localStorage.getItem(this.NOME_CACHE));
    }

    public temCache(): boolean {
        return localStorage.getItem(this.NOME_CACHE) !=null;
        ;
    }
}