import {EventEmitter, Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import {environment} from '../../../environments/environment';

const Keycloak = require('keycloak-js');

@Injectable()
export class KeycloakService extends AuthService {

  static auth: any = {};

  onReady = new EventEmitter();
  isReady = false;

  init(): Observable<boolean> {
    if (!environment.keycloak || !environment.keycloak.config) {
      Observable.throw(new Error('Defina as configurações do keycloak em enviroment'));
    }
    const keycloakAuth: any = new Keycloak(environment.keycloak.config);
    KeycloakService.auth.loggedIn = false;
    return Observable.create(observer => {
      keycloakAuth.init({onLoad: 'login-required', checkLoginIframe: false, redirect_uri: environment.keycloak.redirect_uri})
        .success(() => {
          KeycloakService.auth.loggedIn = true;
          KeycloakService.auth.authz = keycloakAuth;
          KeycloakService.auth.logoutUrl = environment.keycloak.logoutUrl;
          this.isReady = true;
          this.onReady.emit(this.isReady);
          observer.next(true);
        })
        .error(error => {
          observer.error(error);
        });
    });
  }

  login(auth: any): Observable<any> {
    return Observable.throw(new Error('Não implementado!!'));
  }

  logout(): Observable<any> {
    KeycloakService.auth.loggedIn = false;
    KeycloakService.auth.authz = null;
    window.location.href = environment.keycloak.logoutUrl;
    return Observable.of(true);
  }

  isAuthenticate(): boolean | Observable<boolean> {
    try {
      if (this.isReady) {
        return KeycloakService.auth.authz.authenticated;
      }
      return Observable.create(observer => {
        this.onReady.subscribe(() => {
          observer.next(this.isReady);
        }, (error) => {
          observer.next(false);
        });
      });
    } catch (e) {
      return false;
    }
  }

  getToken(): Observable<string> {
    return Observable.create(observer => {
      if (KeycloakService.auth.authz.token) {
        KeycloakService.auth.authz.updateToken(30)
          .success(() => {
            observer.next(<string>KeycloakService.auth.authz.token);
          })
          .error(() => {
            observer.error('Failed to refresh token');
          });
      } else {
        observer.error('Não autenticado');
      }
    });

  }

  getRoles(): Observable<Array<string>> {
    const roles = KeycloakService.auth.authz.tokenParsed.realm_access.roles;
    return Observable.of(roles);
  }

  getUsername(): Observable<string> {
    const username = KeycloakService.auth.authz.tokenParsed.preferred_username;
    return Observable.of(username);
  }
}
