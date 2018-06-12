import { Injectable } from '@angular/core';
import { AbstractServicos } from '../servicos/abstract.servicos';
import { LancamentoVO } from '../dominio/vo/lancamento-vo';
import { HttpInterceptor } from '../servicos/http-interceptor';
import { Headers,RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { GravacaoArquivoDto } from '../dominio/dto/gravacao-arquivo-dto';

@Injectable()
export class ConciliacaoServiceService extends AbstractServicos<LancamentoVO> {


  private url: string = '/lancamentos';

  constructor(protected http:HttpInterceptor) {
      super();
   }

  public enviarArquivo(arquivo: GravacaoArquivoDto): Observable<any> {
      var firstHeaders = new Headers();
      //firstHeaders.append('Content-Type', undefined); 
   //   firstHeaders.append('withCredentials', "true");

      return this.http.post(this.url +'/gravar-arquivo', arquivo);
  }
 
  public transformar(element: any): LancamentoVO {
    throw new Error("Method not implemented.");
  }

}
