import { Injectable } from '@angular/core';
import {HttpInterceptor} from '../servicos/http-interceptor';
import { Observable } from 'rxjs';
import {AbstractServicos} from '../servicos/abstract.servicos';

@Injectable()
export class DashBoardService {

  protected uri: string = '/dashboard';

  constructor(protected http: HttpInterceptor) { 
      
  }

  public montarDashboards(): any {
      return this.http.get(this.uri)
           .map(dados => dados.json());        
  }


}
