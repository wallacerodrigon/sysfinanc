import { Injectable } from "@angular/core";
import { FiltraParcelasDto } from "../dominio/dto/filtra-parcelas-dto";
import { Observable } from "rxjs/Observable";
import { LancamentoVO } from "../dominio/vo/lancamento-vo";
import { AbstractServicos } from "../servicos/abstract.servicos";
import { HttpInterceptor } from "../servicos/http-interceptor";
import { UtilObjeto } from "../utilitarios/util-objeto";
import { UtilizacaoParcelasDto } from "../dominio/dto/utilizacao-parcelas-dto";
import { Constantes } from "../utilitarios/constantes";
import { UtilizacaoLancamentoVO } from "../dominio/vo/utilizacao-lancamento-vo";
import { BaixaLancamentoDTO } from "../dominio/dto/baixa-lancamento-dto";
import { GeracaoParcelasDto } from "../dominio/dto/geracao-parcelas-dto";
import { RegistroExtratoDto } from "../dominio/dto/registro-extrato-dto";

@Injectable()
export class LancamentoService extends AbstractServicos<LancamentoVO>  {

    protected uri: string = '/lancamentos';
    
    constructor(protected http: HttpInterceptor) { 
        super();
    }

    public transformar(element: any): LancamentoVO {
        return UtilObjeto.transformar(element, new LancamentoVO());
    }
    

    public filtrar(dto: FiltraParcelasDto): Observable<LancamentoVO[]> {
        return this.pesquisar(this.uri+"/buscarLancamentos", JSON.stringify(dto))
            .map(dados => dados);
    }

    public utilizar(dto: UtilizacaoParcelasDto): Promise<LancamentoVO[]> {
        return this.executarPost(this.uri + '/utilizar', dto);

    }

    public baixar(dto: BaixaLancamentoDTO): Observable<any> {
        return this.http.post(this.uri + '/baixar', JSON.stringify(dto));

    }

    public listarUsos(idLancamento: number): Observable<UtilizacaoLancamentoVO[]> {
        let lista : UtilizacaoLancamentoVO[] = [];
        return this.pesquisarGet(this.uri + '/listarHistoricoUso?idLancamento='+idLancamento)
                .map(dados => {
                    dados.forEach(element => {
                        let vo: UtilizacaoLancamentoVO = new UtilizacaoLancamentoVO();
                        vo.transformar(element)
                        lista.push(vo);                        
                    });
                    return lista;
                });
                
    }

    public gerarLancamentosComDto(dto: GeracaoParcelasDto): Observable<LancamentoVO[]> {
        return this.executarPostSubscribe(this.uri + '/gerar-lancamento', dto)
            .map(retorno => {
                return retorno.json()
                                .map(dado => {
                                     let vo: LancamentoVO = new LancamentoVO();
                                     Object.assign(vo, dado);
                                     return vo;
                                });
            });
    }    


    public gerarLancamentos(idRubrica: number, strVencimento:string, qtd: number, valor: number, isParcial: boolean, descricao?:string): Promise<LancamentoVO[]> {
        let dto: GeracaoParcelasDto = new GeracaoParcelasDto(idRubrica, qtd, strVencimento, valor, null, isParcial, null, descricao);
        return this.executarPost(this.uri + '/gerar-lancamento', dto);
                
    }    

    public associarLancamentos(listaDtos: Array<RegistroExtratoDto>): Promise<any> {
        return this.executarPut(this.uri + "/associar-lancamento-extrato", listaDtos);
    }

}