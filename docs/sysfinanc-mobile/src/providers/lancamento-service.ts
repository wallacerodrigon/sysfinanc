import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import {Constantes} from '../app/utilitarios/constantes';
import {SaldoLancamento} from '../app/entidades/saldo-lancamento';

import {LancamentoVO} from '../app/entidades/lancamentoVO';
import {ResumoVO} from '../app/entidades/resumoVO';
import {HistoricoUsoVO} from '../app/entidades/HistoricoUsoVO';


import {GeracaoLancamentoDTO} from '../app/dto/geracao-lancamento-dto';
import {UtilizacaoLancamentoDTO} from '../app/dto/utilizacao-lancamento-dto';
import {LancamentoDTO} from '../app/dto/lancamento-dto';

import {HttpServicos} from '../app/utilitarios/HttpServicos';
import { AbstractServicos } from './abstract.servicos';
import { Observable } from 'rxjs';
import { HttpInterceptor } from './http-interceptor';

@Injectable()
export class LancamentoService extends AbstractServicos<LancamentoVO> {
  //http://walltec.net.br/sysfinanc/rest/lancamentos/resumo-mes/06/2017
  private _mes:Number =0;
  private _ano:Number = 0;
  protected uri: string = Constantes.URL_BASE + "/lancamentos";
    
  constructor(public http: HttpInterceptor) { 
      super();
  }

  public transformar(element: any): LancamentoVO {
     let vo: LancamentoVO = new LancamentoVO();
     Object.assign(vo, element);
     return vo;
  }  

  private _getUriResumoMes(mes:Number, ano:Number){
    return this.uri + `/obter-resumo-mes/${mes}/${ano}`;
  }

  recuperarSaldo(dataReferencia: Date) {
    this._mes = dataReferencia.getMonth();
    this._ano = dataReferencia.getUTCFullYear();

    return this.http
        .get(this._getUriResumoMes(this._mes, this._ano))
        .map(res => res.json())
        //.toPromise()
        .subscribe(resumo => new SaldoLancamento(dataReferencia, parseFloat(resumo.totalReceitas), 
                                            parseFloat(resumo.totalDespesas),
                                            parseFloat(resumo.saldoFinal) ) );

  }

  _montarStrDataBase(dataReferencia: Date):string{
    return dataReferencia.getUTCFullYear() + "-" +
                      dataReferencia.getUTCMonth() + "-" +
                      dataReferencia.getUTCDate();

  }

  recuperarLancamentos(dataReferencia: Date, isDespesa: boolean) {
    //lancamentos?idUsuario=1&dataBase=2017-06-01
    let lancamentos: Array<LancamentoVO> = [];
    let filtroDto: Object = {"mes": dataReferencia.getMonth()+1, "ano":dataReferencia.getFullYear()};
    return this.http
        .post(this.uri +"/buscarLancamentos", filtroDto)
        //.map(res => res.json())
        //.toPromise()
        .subscribe(lista => {
             let lancFiltrados = lista.json().filter(item => item.despesa === isDespesa);

             lancFiltrados.forEach( dado => {
                lancamentos.push( new LancamentoVO(dado.id, dado.descricao, dado.dataVencimentoStr, 
                                     dado.valor, 0, dado.bolPaga));
             });

             return lancamentos; 
        });
  }

  gerarLancamentos(dtoGeracao: GeracaoLancamentoDTO){
       return this.http
          .post(this.uri + "/gera", JSON.stringify(dtoGeracao));
  }

  usarLancamentos(idLancOrigem:number, dataUtilizacao:string, valorUtilizado:number){
      let dataAux: string[] = dataUtilizacao.split("-");
      let dto = {
        "idLancamentoOrigem":idLancOrigem,
        "valorUtilizado": valorUtilizado,
        "dataUtilizacaoStr": dataAux[2]+"/"+ dataAux[1]+"/"+dataAux[0],
        "descricao":"utilizando parte do lançamento"
      };
      return this.http
          .post(this.uri + "/utilizar", dto);
	};	

  //TODO: voltar para tratar o retorno e colocar num objeto
 listarUsos(pIdLancamento: number){
      let usos: Array<HistoricoUsoVO> = [];
      return this.http
          .get(this.uri + "/listarHistoricoUso?idLancamento="+pIdLancamento)
          .map(res => res.json())
         // .toPromise()
          .subscribe(lista => {
              lista.forEach(dado =>{
                  let histUso: HistoricoUsoVO = new HistoricoUsoVO(dado.descricao, dado.dataStr, dado.valor);
                  usos.push(histUso);
              })
              
              return usos;
              
          });
          
	};

  baixarLancamento(pIdLancamento: number){
      let objBaixa: Object = {"listaIdsLancamentos":[pIdLancamento]};
      return this.http
          .post(this.uri + "/baixar", objBaixa);
	};

  excluirLancamento(pIdLancamento:number){
      return this.http
          .delete(this.uri + "/"+pIdLancamento);
	}	

  salvarLancamento(pLancamento: LancamentoVO): Promise<any> {
      pLancamento.idUsuario = Constantes.ID_USUARIO_PADRAO;
      return this.executarPut(this.uri, new LancamentoDTO().converter(pLancamento))
        .then(retorno => retorno)
        .catch(erro => erro);
	}		

    recuperarResumoGeral(dataReferencia: Date) {
        let mes: number = dataReferencia.getMonth();
        let ano: number = dataReferencia.getFullYear();
        return this.http
            .get(this.uri + `/obter-resumo-mes-detalhe/${mes}/${ano}`)
            .map(res => res.json())
            .subscribe(retorno => {
                    let resumo : ResumoVO = new ResumoVO();
                    resumo.recPagas = retorno.totalRecebido;
                    resumo.despPagas = retorno.totalPago;
                    resumo.recNaoPagas = retorno.totalReceber;
                    resumo.despNaoPagas= retorno.totalPagar;
                    resumo.despesaTotal = retorno.totalDespesas;
                    resumo.receitaTotal =retorno.totalReceitas;
                    return resumo;
            });        
        
    }

}
