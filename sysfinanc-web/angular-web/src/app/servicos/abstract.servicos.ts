import { Injectable } from '@angular/core';
import {HttpInterceptor} from './http-interceptor';
import { Observable } from 'rxjs';
import {Constantes} from '../utilitarios/constantes';
import { UtilObjeto } from 'app/utilitarios/util-objeto';

/**classe abstrata com os serviços comuns dos cruds */

export abstract class AbstractServicos<T> {

  protected http: HttpInterceptor;
  protected uri: string;

  public ping(): Promise<any> {
      return this.http
            .get(this.uri)
            .toPromise();
  }

  public listar(): Observable<T[]> {
    return this.http
      .get(this.uri)
      .map(dados => {
          let lista: Array<T> = [];

          dados.json().forEach(element => {
              lista.push(this.transformar(element));
          });
          return lista;
    });
  }

  public pesquisar(url: string, payload: string): Observable<T[]> {
    return this.http
      .post(url, payload)
      .map(dados => {
          let lista: Array<T> = [];
          let json: string= JSON.stringify(dados.json());
          dados.json().forEach(element => {
              lista.push(this.transformar(element));
          });
          return lista;
    });
  }  


  public pesquisarGet(url: string): Observable<any> {
    return this.http
      .get(url)
      .map(dados => {
        console.log(dados);
          let json: string= JSON.stringify(dados.json());
          return dados.json();
    });
  }    

  public excluir(id: number): Promise<any> {
      return this
          .http
          .delete(this.uri+'/'+ id)
          .toPromise();
  }

  public incluir(objeto: T): Promise<any> {
    return this.executarPost(this.uri, objeto);
  }  

  public alterar(objeto: T): Promise<any> {
      return this.executarPut(this.uri, objeto);
  }


  public executarPost( url: string, objeto: any): Promise<any> {
    return this
        .http
        .post(url, JSON.stringify(objeto))
        .toPromise()
        ;
}  

public executarPostSubscribe( url: string, objeto: any): Observable<any> {
  return this
      .http
      .post(url, JSON.stringify(objeto));
}  


public executarPut(url: string, objeto: any): Promise<any> {
    return this
        .http
        .put(url, JSON.stringify(objeto))
        .toPromise();
}  

  public getURL(retorno: any){
        let url: string =  (Constantes.URL.indexOf('localhost') === -1) ?  retorno._body : Constantes.DOMINIO +retorno._body;
        return url;
  }
    

  /**transforma o resultado da lista em um objeto esperado */
  public abstract transformar(element: any): T;
  
}