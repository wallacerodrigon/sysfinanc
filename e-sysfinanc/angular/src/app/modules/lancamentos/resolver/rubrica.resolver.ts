import {Injectable} from '@angular/core';
import { Resolve } from '@angular/router/src/interfaces';
import { ActivatedRouteSnapshot } from '@angular/router/src/router_state';
import { Rubrica } from '../../rubricas/model/rubrica.class';
import { RubricaService } from '../../rubricas/service/rubrica.service';
import { Paginator } from '../../../shared/model/paginator.model';


@Injectable()
export class RubricaResolver implements Resolve<Rubrica> {

  constructor(private rubricaService: RubricaService) {
    
  }

  resolve(route: ActivatedRouteSnapshot) {
    return new Promise<any>(resolve => {
      this.rubricaService.getAll('0').subscribe(data => {
        resolve(data);
      });
    });
  }  
 
}
