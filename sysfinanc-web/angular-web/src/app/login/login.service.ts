import { Injectable } from '@angular/core';
import {UsuarioVO} from '../dominio/vo/usuario-vo';
import {AbstractServicos} from '../servicos/abstract.servicos';
import { RecuperaUsuarioLoginSenhaDto } from '../dominio/dto/recupera-usuario-login-senha-dto';

import { Observable } from 'rxjs/Observable';
import { UtilObjeto } from '../utilitarios/util-objeto';
import { HttpInterceptor } from '../servicos/http-interceptor';

@Injectable()
export class LoginService extends AbstractServicos<UsuarioVO> {

  protected uri: string = '/usuario';

  constructor(protected http: HttpInterceptor) { 
      super();
  }

  public transformar(element: any): UsuarioVO {
       return UtilObjeto.transformar(element, new UsuarioVO());
  };  

  public efetuarLogin(dto: RecuperaUsuarioLoginSenhaDto): Observable<UsuarioVO> {
    return this.http.post(this.uri+'/efetuarLogin', JSON.stringify(dto))
          .map(retorno => {
            console.log(retorno);
            let json : string = JSON.stringify(retorno.json());
            sessionStorage.setItem("usuario", json);            
            return JSON.parse(json);
          });
          
  }

}
