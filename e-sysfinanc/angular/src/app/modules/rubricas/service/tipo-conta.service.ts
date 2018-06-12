import { Injectable } from '@angular/core';
import { Rubrica } from '../model/rubrica.class';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {HttpDataAbstract} from '../../../shared/abstract/http-data.abstract';
import {API_BASE} from '../../../app.constants';
import { Paginator } from '../../../shared/model/paginator.model';
import { MatPaginator } from '@angular/material';
import { TipoConta } from '../model/tipo-conta.class';

@Injectable()
export class TipoContaService  extends HttpDataAbstract<TipoConta> {

  constructor(protected http: HttpClient) {
    super(http, 'tiposContas');
  }



}
