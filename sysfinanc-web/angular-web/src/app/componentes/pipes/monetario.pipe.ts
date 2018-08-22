import { Pipe, PipeTransform } from '@angular/core';
import { Formatadores } from '../../utilitarios/formatadores';

@Pipe({
  name: 'moeda'
})
export class MonetarioPipe implements PipeTransform {

  transform(value: any, args?: any): string {
    return Formatadores.formataMoeda(value);
  }

}
