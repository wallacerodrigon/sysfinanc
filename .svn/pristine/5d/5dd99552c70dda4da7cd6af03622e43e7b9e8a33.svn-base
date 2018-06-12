import {Injectable} from '@angular/core';
import { TipoConta } from '../model/tipo-conta.class';
import { TipoContaService } from '../service/tipo-conta.service';
import { Resolve } from '@angular/router/src/interfaces';
import { ActivatedRouteSnapshot } from '@angular/router/src/router_state';


@Injectable()
export class TipoContaResolver implements Resolve<TipoConta> {

  constructor(private tipoContaService: TipoContaService) {
    
  }

  resolve(route: ActivatedRouteSnapshot) {
    return new Promise<TipoConta>(resolve => {
      this.tipoContaService.getAll('0').subscribe(data => {
        resolve(data as TipoConta);
      });
    });
  }  
 
}
