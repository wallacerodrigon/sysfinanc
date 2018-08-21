import { Pipe, PipeTransform } from '@angular/core';
import { Formatadores } from '../../utilitarios/formatadores';
import { UtilData } from '../../utilitarios/util-data';

@Pipe({
  name: 'data'
})
export class DataPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value ? UtilData.converterToString(value) : "";
  }

}
