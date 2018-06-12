import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Event} from './models/event.model';
import {API_BASE} from '../../app.constants';

@Injectable()
export class DashboardService {

  constructor(private http: HttpClient) {
  }

  events(search?: string): Observable<Event[]> {
    return this.http.get<Event[]>(`${API_BASE}/events`);
  }

}
