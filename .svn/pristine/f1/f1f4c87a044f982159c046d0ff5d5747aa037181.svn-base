import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {API_BASE} from '../../app.constants';
import {BaseRest} from '../model/base-rest.model';
import {Paginator} from '../model/paginator.model';


export abstract class HttpDataAbstract<T> implements BaseRest<T> {

  constructor(protected http: HttpClient, private endPoint: string) {
  }

  getAll(page: string, search?: string): Observable<Paginator<T>> {
    return this.http.get<Paginator<T>>(`${API_BASE}/${this.endPoint}`, {params: {page}});
  }

  getById(id: any): Observable<T> {
    return this.http.get<T>(`${API_BASE}/${this.endPoint}/${id}`);
  }

  save(data: T): Observable<T> {
    return this.http.post<T>(`${API_BASE}/${this.endPoint}`, data);
  }

  update(data: T): Observable<T> {
    return this.http.put<T>(`${API_BASE}/${this.endPoint}/${data['id']}`, data);
  }

  delete(data: T): Observable<T> {
    return this.http.delete<T>(`${API_BASE}/${this.endPoint}/${data['id']}`);
  }

}
