import { Injectable }     from '@angular/core';
import { CanActivate, Router,   ActivatedRouteSnapshot,  RouterStateSnapshot }    from '@angular/router';
import {UsuarioVO} from '../dominio/vo/usuario-vo';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router){

  }

 canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;
    if (url.startsWith('login') || sessionStorage.getItem("usuario")){
        return true; 
    } else {
      this.router.navigate(['/acesso-invalido']);
      return false;
    }
    //return true;
  }
}