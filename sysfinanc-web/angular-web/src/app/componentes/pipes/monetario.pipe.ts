import { Pipe, PipeTransform } from '@angular/core';
import { Formatadores } from '../../utilitarios/formatadores';

@Pipe({
  name: 'monetario'
})
export class MonetarioPipe implements PipeTransform {

  transform(value: any, args?: any): string {
    return value ? Formatadores.formataMoeda(value) : "0,00";
  }

}
