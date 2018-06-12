import {Injectable} from '@angular/core';
import {ResolverAbstract} from '../../../shared/abstract/resolver.abstract';
import { Rubrica } from '../model/rubrica.class';
import { RubricaService } from '../service/rubrica.service';

@Injectable()
export class RubricaResolver extends ResolverAbstract<Rubrica> {

  constructor(private rubricaService: RubricaService) {
    super(rubricaService);
  }
 
}
