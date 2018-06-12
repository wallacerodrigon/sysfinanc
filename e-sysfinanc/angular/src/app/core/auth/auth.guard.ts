import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {AuthService} from './auth.service';


/**
 * Verifica se está autenticado, caso contrário
 */
@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(private router: Router, private authService: AuthService) {
  }

  checkAuth(): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.authService.isEnable) {
      return true;
    }
    return this.authService.isAuthenticate();
  }


  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkAuth();
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.checkAuth();
  }


  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkAuth();
  }

}
