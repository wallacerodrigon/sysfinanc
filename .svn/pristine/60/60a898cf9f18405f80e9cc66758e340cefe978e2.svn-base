import {Injectable} from '@angular/core';
import {Employer} from '../interface/employer.interface';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {HttpDataAbstract} from '../../../shared/abstract/http-data.abstract';
import {API_BASE} from '../../../app.constants';


@Injectable()
export class EmployerService extends HttpDataAbstract<Employer> {

  constructor(protected http: HttpClient) {
    super(http, 'employers');
  }

  /**
   * Envia com a ação de create
   * @param {Array<Employer>} employers
   */
  sendCreate(employers: Array<Employer>): Observable<Employer> {
    return this.http.post<Employer>(`${API_BASE}/employers/${employers[0].id}/send/create`, null);
  }

  /**
   * Envia ação de update
   * @param {Array<Employer>} employers
   */
  sendUpdate(employers: Array<Employer>): Observable<Employer> {
    return this.http.post<Employer>(`${API_BASE}/employers/${employers[0].id}/send/update`, null);
  }

  /**
   * Envia ação de delete
   * @param {Array<Employer>} employers
   */
  sendDelete(employers: Array<Employer>): Observable<Employer> {
    return this.http.post<Employer>(`${API_BASE}/employers/${employers[0].id}/send/delete`, null);
  }

  teste(): void {
    this.http.get(`${API_BASE}/stub/ping`).subscribe(dado => console.log(dado));
  }
}
