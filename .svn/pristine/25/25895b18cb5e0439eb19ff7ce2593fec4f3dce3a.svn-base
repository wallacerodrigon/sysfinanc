import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import {User} from '../model/user.model';
import {Paginator} from '../../../shared/model/paginator.model';
import {API_BASE} from '../../../app.constants';


@Injectable()
export class UserService {

  constructor(private http: HttpClient) {
  }

  /**
   * Obtem uma lista de Usuários
   * @param page Numero da pagina
   * @param search Parametro para busca
   */
  get(page: string, payload?: any): Observable<Paginator<User>> {
    return this.http.get<Paginator<User>>(`${API_BASE}/users`, {params: {page, payload: JSON.stringify(payload)}});
  }

  /**
   * Obtem um usuário pelo id
   * @param id Id do usuário
   */
  getById(id: any): Observable<User> {
    return this.http.get<any>(`${API_BASE}/users/${id}`).map(response => response.data as User);
  }

}
