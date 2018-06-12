import { Injectable } from '@angular/core';
import { Rubrica } from '../model/rubrica.class';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {HttpDataAbstract} from '../../../shared/abstract/http-data.abstract';
import {API_BASE} from '../../../app.constants';
import { Paginator } from '../../../shared/model/paginator.model';
import { MatPaginator } from '@angular/material';
import { TipoConta } from '../model/tipo-conta.class';
import { GeracaoParcelasDto } from '../../lancamentos/model/geracao-parcelas-dto';
import { LancamentoVO } from '../../../shared/model/lancamento-vo';
import { HttpInterceptorLocal } from '../../../shared/abstract/http-interceptor-local';
 
@Injectable()
export class RubricaService  extends HttpDataAbstract<Rubrica> {

  constructor(protected http: HttpInterceptorLocal) {
    super(http, 'rubricas');
  }

  public gerarLancamentos(dto: GeracaoParcelasDto): Promise<LancamentoVO[]> {
    let dados: Array<LancamentoVO> = [];
   return this.http.post(`${API_BASE}/rubricas/gerarLancamentos`, dto)
        .map(result => {
          console.log(result);
          let vo: LancamentoVO = new LancamentoVO();
          Object.assign(vo, result);
          return dados;
        })
        .toPromise();
  }

}
