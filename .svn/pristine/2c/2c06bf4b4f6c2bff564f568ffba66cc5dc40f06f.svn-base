import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {BaseRest} from '../model/base-rest.model';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import {Injectable} from '@angular/core';


@Injectable()
export abstract class ResolverAbstract<T> implements Resolve<T> {

  constructor(private dataService: BaseRest<T>) {
  }

  resolve(route: ActivatedRouteSnapshot) {
    return new Promise<T>(resolve => {
      this.dataService.getById(route.params.id).subscribe(data => {
        resolve(data as T);
      });
    });
  }
}
