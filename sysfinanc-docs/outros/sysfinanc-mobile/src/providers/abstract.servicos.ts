import { Injectable } from '@angular/core';
import {HttpInterceptor} from './http-interceptor';
import { Observable } from 'rxjs';

/**classe abstrata com os serviços comuns dos cruds */

export abstract class AbstractServicos<T> {

  protected uri: string;
  protected http: HttpInterceptor;

  // constructor(public http: HttpInterceptor) { 
  // }



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

public executarPut(url: string, objeto: any): Promise<any> {
    return this
        .http
        .put(url, JSON.stringify(objeto))
        .toPromise();
}  
    

  /**transforma o resultado da lista em um objeto esperado */
  public abstract transformar(element: any): T;
  
}