import { AbstractServicos } from "./abstract.servicos";
import { UsuarioVO } from "../app/entidades/UsuarioVO";
import { HttpInterceptor } from "./http-interceptor";
import { Injectable } from "@angular/core";

@Injectable()
export class UsuarioService extends AbstractServicos<UsuarioVO> {

    protected uri: string = "/usuario";

    constructor(public http: HttpInterceptor) { 
        super();
    }
  

    public transformar(element: any): UsuarioVO {
        let vo: UsuarioVO = new UsuarioVO();
        Object.assign(vo, element);
        return vo;
    }

    public efetuarLogin(usuario: string, senha: string): Promise<UsuarioVO> {
        return this.executarPost(this.uri, 
            {usuario: usuario, senha: senha}
        )
        .then(retorno => retorno)
        .catch(erro => erro)
    }
}