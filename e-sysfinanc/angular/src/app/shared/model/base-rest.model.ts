import {Observable} from 'rxjs/Observable';
import {Paginator} from './paginator.model';

export interface BaseRest<T> {
  getAll(page: string, search?: string): Observable<Paginator<T>>;

  getById(id: any): Observable<T>;

  save(T);

  update(T);

  delete(T);
}
