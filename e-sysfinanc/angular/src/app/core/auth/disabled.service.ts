import {EventEmitter, Injectable} from '@angular/core';

import {AuthService} from './auth.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

@Injectable()
export class DisabledService extends AuthService {

  isEnable = false;
  isReady = true;
  onReady = new EventEmitter();

  init(): Observable<boolean> {
    throw new Error('Método de autenticação não suportado');
  }

  login(auth: any): Observable<any> {
    throw new Error('Método de autenticação não suportado');
  }

  logout(): Observable<any> {
    throw new Error('Método de autenticação não suportado');
  }

  isAuthenticate(): boolean | Observable<boolean> {
    throw new Error('Método de autenticação não suportado');
  }

  getToken(): Observable<string> {
    throw new Error('Método de autenticação não suportado');
  }

  getRoles(): Observable<Array<string>> {
    throw new Error('Método de autenticação não suportado');
  }

  getUsername(): Observable<string> {
    throw new Error('Método de autenticação não suportado');
  }
}
