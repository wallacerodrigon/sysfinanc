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

@Injectable()
export class LancamentoService {
  //http://walltec.net.br/sysfinanc/rest/lancamentos/resumo-mes/06/2017
  private _mes:Number =0;
  private _ano:Number = 0;
  private _urlLancamentos: string = Constantes.URL_BASE + "/lancamentos";

  constructor(public http: HttpServicos) {
    console.log('Hello Lancamento Provider');
  }

  private _getUriResumoMes(mes:Number, ano:Number){
    return this._urlLancamentos + `/resumo-mes/${mes}/${ano}`;
  }

  recuperarSaldo(dataReferencia: Date) {
    this._mes = dataReferencia.getMonth();
    this._ano = dataReferencia.getUTCFullYear();

    return this.http
        .get(this._getUriResumoMes(this._mes, this._ano))
        //.map(res => res.json())
        //.toPromise()
        .then(resumo => new SaldoLancamento(dataReferencia, parseFloat(resumo.totalReceitas), 
                                            parseFloat(resumo.totalDespesas) ) );

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
        .post(this._urlLancamentos +"/buscarLancamentos", filtroDto)
        //.map(res => res.json())
        //.toPromise()
        .then(lista => {
             let lancFiltrados = lista.json().filter(item => item.despesa === isDespesa);

             lancFiltrados.forEach( dado => {
                lancamentos.push( new LancamentoVO(dado.id, dado.descConta, dado.dataVencimentoStr, 
                                     dado.valor, 0, dado.bolPaga));
             });

             return lancamentos; 
        });
  }

  gerarLancamentos(dtoGeracao: GeracaoLancamentoDTO){
       return this.http
          .post(this._urlLancamentos + "/gera", JSON.stringify(dtoGeracao));
  }

  usarLancamentos(idLancOrigem:number, dataUtilizacao:Date, valorUtilizado:number){
      let dto = {
        "idLancamentoOrigem":idLancOrigem,
        "valorUtilizado": valorUtilizado,
        "dataUtilizacaoStr": dataUtilizacao,
        "descricao":"utilizando parte do lançamento"
      };
      return this.http
          .post(this._urlLancamentos + "/utilizar", dto);
	};	

  //TODO: voltar para tratar o retorno e colocar num objeto
 listarUsos(pIdLancamento: number){
      let usos: Array<HistoricoUsoVO> = [];
      return this.http
          .get(this._urlLancamentos + "/listarHistoricoUso?idLancamento="+pIdLancamento)
         // .map(res => res.json())
         // .toPromise()
          .then(lista => {
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
          .post(this._urlLancamentos + "/baixar", objBaixa);
	};

  excluirLancamento(pIdLancamento:number){
      return this.http
          .deleteUrl(this._urlLancamentos + "/"+pIdLancamento);
	}	

  salvarLancamento(pLancamento: LancamentoVO){
      pLancamento.idUsuario = Constantes.ID_USUARIO_PADRAO;
      return this.http
          .put(this._urlLancamentos, new LancamentoDTO().converter(pLancamento));
	}		

    recuperarResumoGeral(dataReferencia: Date) {

        return this.http
            .get(this._urlLancamentos +"?idUsuario=1&dataBase="+this._montarStrDataBase(dataReferencia))
            .then(lancamentos => {
                    let resumo : ResumoVO = new ResumoVO();
                    
                    lancamentos.forEach(item => {
                        if (item.bolPaga){
                            resumo.recPagas += item.bolDespesa ? 0.00 : item.valorVencimento;
                            resumo.despPagas += item.bolDespesa ? item.valorVencimento : 0.00;
                        } else {
                            resumo.recNaoPagas += item.bolDespesa ? 0.00 : item.valorVencimento;
                            resumo.despNaoPagas+= item.bolDespesa ? item.valorVencimento : 0.00;
                        }
                    });

                    return resumo;
            });        
        
    }

}
