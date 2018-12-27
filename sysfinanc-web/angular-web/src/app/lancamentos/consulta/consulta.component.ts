import { Component, OnInit, EventEmitter,ViewChild, transition } from '@angular/core';
import { LancamentoVO } from '../../dominio/vo/lancamento-vo';
import { LancamentoService } from '../../lancamentos/lancamento.service';
import { Formatadores } from '../../utilitarios/formatadores';
import { FiltraParcelasDto } from '../../dominio/dto/filtra-parcelas-dto';
import { DialogService } from 'ng2-bootstrap-modal/dist/dialog.service';
import { AlertaComponent } from '../../componentes/mensagens/alert.component';
import { AcoesRegistroTabela } from '../../componentes/crud-componente/acoes-registro-tabela';

//
import {UtilizacaoComponent} from '../utilizacao/utilizacao.component';
import {VisaoUsosComponent} from '../visao-usos/visao-usos.component';
import { UtilizacaoLancamentoVO } from '../../dominio/vo/utilizacao-lancamento-vo';
import { BaixaLancamentoDTO } from '../../dominio/dto/baixa-lancamento-dto';
import { CrudComponente } from '../../componentes/crud-componente/crud-componente.component';
import { UtilObjeto } from '../../utilitarios/util-objeto';
import { EdicaoComponent } from '../edicao/edicao.component';
import { CadastroComponent } from '../cadastro/cadastro.component';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Observable } from 'rxjs/Observable';
import { ConfirmComponent } from '../../componentes/mensagens/confirm.component';
import { removeDebugNodeFromIndex } from '@angular/core/src/debug/debug_node';
import { Constantes } from '../../utilitarios/constantes';

@Component({
  selector: '..-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {

    //falta informar se é debito ou crédito
  private colunas: string[] = ["Data Vencimento", "Descrição", "Crédito", "Débito", "Pago", "Num.Doc.", "Meio Pagto"];
  private listagem: Array<LancamentoVO> = [];
  private listagemOriginal: Array<LancamentoVO> = [];

  private indicesValores: number[] = [3, 4, 5];
  private habilitaEdicao: boolean = false;

  private tamanhoListagem: number = 0;
  private atributos: Array<string> = ["dataVencimentoStr", "descricao", "valorCreditoStr", "valorDebitoStr", "bolPagaIcone", "numDocumento", "descFormaPagamento"];
  private totalizadores: Array<number> = [];
  private numColunas = this.colunas.length + 2;
  private valor: string = "0,00";
  private mesFechado: boolean = false;
  private controleExibicao = [];

  protected listaAcoes: Array<AcoesRegistroTabela> = [
      {nomeAcao:"Utilizar", classeCss:"glyphicon glyphicon-scissors", eventoAcao: this.abrirUtilizacaoLancamento, callBack: this.filtrar},
  ];
  
  @BlockUI() blockUI: NgBlockUI;  

  private resumos: Array<any> = [
      {nome:"Créditos", valor: "0,00", cor:"#00f", filtro:"TR"}, 
      {nome:"A Receber", valor: "0,00", cor:"#00f", filtro:"AR"}, 
      {nome:"Recebido", valor: "0,00", cor:"#00f", filtro:"RE"}, 
      {nome:"Débitos", valor: "0,00", cor:"#f00", filtro:"TD"},
      {nome:"A pagar", valor: "0,00", cor:"#f00", filtro:"AP"}, 
      {nome:"Pago", valor: "0,00", cor:"#f00", filtro:"PG"}, 
      {nome:"Saldo Final", valor: "0,00", cor:"#0f0", filtro:"-"}, 
      {nome:"Resta conciliar", valor: "0,00", cor:"#f00", filtro:"NC"},
      {nome:"Disponível no BB", valor: "0,00", cor:"#00f", filtro:"TC"},
  ];

  private mes: number;
  private ano: number;
  public paginaAtual: number = 1;
  public itensPorPagina: number = 6;

  @ViewChild("crudComponente") crudComponente: CrudComponente;

  constructor(private servico: LancamentoService, public dialogService: DialogService) { }

  ngOnInit() {
      this.mes = new Date().getMonth()+1;
      this.ano = new Date().getFullYear();

      this.filtrar();
  }

  private atualizarListagemUtilizada(lancamentoOriginal: LancamentoVO, lancamentoIncluido: LancamentoVO, indiceOrigem: number): void {
    this.listagem[indiceOrigem] = lancamentoOriginal;
    this.listagem.push(lancamentoIncluido)

  }

  public abrirUtilizacaoLancamento(item: any){
      this.dialogService.addDialog(UtilizacaoComponent, {
          lancamento: item
      }).subscribe(efetuado => {
          if (efetuado){
            this.filtrar();
          }
      });

  }  

  public abrirUsosLancamento(item: LancamentoVO, indice: number, dialogService: DialogService){
    dialogService.addDialog(VisaoUsosComponent, {
        idLancamento: item.id
    });
}

  private editar(item: LancamentoVO, indice: number) {
    this.dialogService.addDialog(EdicaoComponent, {
        lancamentoOld: item
    }).subscribe(objSalvo => {
        if (objSalvo != null){
            this.filtrar();
            /*this.listagem[this.crudComponente.indiceItem] = objSalvo;
            this.calcularTotalizadores();
            this.montarResumo();*/
        }
    });
   
  }

  private baixarLista(){

      let listaIds: number[] = this.listagem.
                        filter(item => item['selecionado'] == true)
                        .map(vo => vo.id);

      if (listaIds == null || listaIds.length == 0){
        new AlertaComponent(this.dialogService).exibirMensagem('Selecione um ou mais lançamentos para baixar!');
        return false;          
      }
      this.blockUI.start('Baixando lançamentos selecionados. Aguarde!');
      let dto: BaixaLancamentoDTO = new BaixaLancamentoDTO(listaIds);
      this.servico.baixar(dto)
            .subscribe(() => {
                new AlertaComponent(this.dialogService).exibirMensagem('Baixa realizada com sucesso!');
                this.blockUI.stop();
                this.filtrar();
            },
            error => {
                this.blockUI.stop();
                new AlertaComponent(this.dialogService).exibirMensagem('Erro ao efetuar baixa!');
            });
                              
      
  }

  private filtrarLancamentos(tipo: string) {
      this.listagem = this.listagemOriginal
                .filter(lancamento => {

                        if (tipo === 'TC' && lancamento.bolConciliado && lancamento.bolPaga){
                            return lancamento;
                        } else if (tipo === 'NC' && !lancamento.bolConciliado && lancamento.bolPaga){
                            return lancamento;
                        } else if (! lancamento.despesa){
                            if ((tipo === 'AR' && !lancamento.bolPaga) ||
                                (tipo === 'RE' && lancamento.bolPaga ) ||
                                (tipo === 'TR') ){
                                return lancamento;
                            }
                        } else if (lancamento.despesa) {
                            if ( (tipo === 'AP' && !lancamento.bolPaga) ||
                                 (tipo === 'PG' && lancamento.bolPaga) ||
                                 (tipo === 'TD' && lancamento.despesa) ) {
                                return lancamento;
                            }
                        }
                });
      this.tamanhoListagem = this.listagem.length;
      this.calcularTotalizadores();
  }

  public excluirLancamento(lancamento: LancamentoVO, indice: number){
    let disposable = this.dialogService.addDialog(ConfirmComponent, {
        title:'Exclusão', 
        message: 'Confirma a exclusão do registro?' })
        .subscribe(confirmado=> {
            this.excluir(lancamento, indice);
        });
    setTimeout(()=>{
        disposable.unsubscribe();
    },10000);         
  }

  private excluir(lancamentoAExcluir: LancamentoVO, indice: number): any{
      if (lancamentoAExcluir != null){
          
          if (lancamentoAExcluir.bolConciliado){
            new AlertaComponent(this.dialogService).exibirMensagem('Registro já foi conciliado e não pode ser excluído!');
            return false;
          }
          this.blockUI.start('Excluindo registro. Aguarde!');
          this.servico.excluir(lancamentoAExcluir.id)
            .then( () => {
                this.blockUI.stop();
                this.listagem.splice(indice, 1);
                this.calcularTotalizadores();
                this.montarResumo();
                new AlertaComponent(this.dialogService).exibirMensagem('Registro excluído com sucesso');
          })
            .catch(erro => {
                this.blockUI.stop();
                new AlertaComponent(this.dialogService).exibirMensagem(erro._body);
            })
          return null;
      }
  }

  public filtrar(event: Event = null) {
    this.removeFilhasTrsUtilizacao(document.getElementById('tbody'));   
    this.controleExibicao = [];   
    this.blockUI.start('Filtrando Lançamentos. Aguarde!');
    let dto: FiltraParcelasDto = new FiltraParcelasDto(this.mes, this.ano);
    this.servico.filtrar(dto)
        .subscribe(retorno => {
            let retornoJSON = retorno.json();
            this.listagem = retornoJSON.lancamentos;
            this.tamanhoListagem = this.listagem.length;
            this.listagemOriginal = this.listagem;
            this.calcularTotalizadores();
            this.montarResumo();
            this.mesFechado = retornoJSON.mesFechado;
            this.blockUI.stop();
        }, erro => {
            this.blockUI.stop();            
        });
    
  }

  private calcularTotalizadores(){
      let totalCreditos: number = 0.00;
      let totalDebitos : number = 0.00;

      this.listagem.forEach(vo => {
            if (vo.despesa){
                totalDebitos += vo.valor;
            } else {
                totalCreditos += vo.valor;
            }
            if (vo.lancamentosUtilizados){
                let totalFilhos = vo.lancamentosUtilizados.reduce( (previous, vo) => vo.valor, 0);
                totalDebitos += vo.despesa ? totalFilhos : 0;
                totalCreditos += vo.despesa ? 0 : totalFilhos;
            }
      });

      this.totalizadores[this.indicesValores[0]] = totalCreditos;
      this.totalizadores[this.indicesValores[1]] = totalDebitos;
  }


  protected filtrarProximo(){
        if (this.mes == 12){
            this.mes = 1;
            this.ano += 1;
        } else {
            this.mes += 1;
        }
        this.filtrar();
  }

  protected filtrarAnterior(){
    if (this.mes == 1){
        this.mes = 12;
        this.ano -= 1;
    } else {
        this.mes -= 1;
    }
    this.filtrar();

  }
  
  private montarResumo(): any {
    let totalReceber: number = 0.00;
    let totalPagar : number = 0.00;
    let totalRecebido: number = 0.00;
    let totalPago: number = 0.00;
    let totalCredConciliado: number = 0.00;
    let totalCredNaoConciliado: number = 0.00;
    let totalDebConciliado : number = 0.00;
    let totalDebNaoConciliado : number = 0.00;
    this.listagem.forEach(vo => {
        if (vo.despesa){
            if (vo.bolPaga){
                totalPago += vo.valor;
            } else {
                totalPagar += vo.valor;
            }

            if (vo.bolConciliado){
                totalDebConciliado += vo.valor;
            } else {
                totalDebNaoConciliado += vo.valor;
            }
        } else  {
            if (vo.bolPaga){
                totalRecebido += vo.valor;
            } else {
                totalReceber += vo.valor;
            }

            if (vo.bolConciliado && vo.idFormaPagamento == Constantes.DEBITO_CONTA){
                totalCredConciliado += vo.valor;
            } else if (vo.idFormaPagamento == Constantes.DEBITO_CONTA) {
                totalCredNaoConciliado += vo.valor;
            }
        }
    });    
    
    this.resumos[0].valor = totalReceber + totalRecebido;
    this.resumos[1].valor = totalReceber;
    this.resumos[2].valor = totalRecebido;
    this.resumos[3].valor = totalPagar+totalPago;
    this.resumos[4].valor = totalPagar;
    this.resumos[5].valor = totalPago;
    this.resumos[6].valor = this.resumos[0].valor - this.resumos[3].valor;
    this.resumos[7].valor = totalCredNaoConciliado - totalDebNaoConciliado;
    this.resumos[8].valor = totalCredConciliado - totalDebConciliado;
  }

    private novoCadastro(){
        this.dialogService.addDialog(CadastroComponent)
        .subscribe(cadastrado => {
            if (cadastrado){
                this.filtrar()
            }
        });
    }

    formatar(){
        let valor: number = Number(this.valor);
        //alert(Formatadores.formataMoeda(valor));
    }

    fecharMes(){
        let disposable = this.dialogService.addDialog(ConfirmComponent, {
            title:'Fechamento', 
            message: 'Deseja realmente fechar este mês?' })
            .subscribe(confirmado=> {
                if (confirmado){
                    this.servico.fecharMes(this.mes, this.ano)
                        .then(() => {
                            new AlertaComponent(this.dialogService).exibirMensagem('Fechamento realizado com sucesso!') ;
                            this.filtrar();
                        })
                        .catch(erro => new AlertaComponent(this.dialogService).exibirMensagem(erro._body)  );
                }

            });

    }

    exibeMesAnoAtual(): string {
        return `${this.mes}/${this.ano}`;
    }

    public exibeLancamentos(item: LancamentoVO) {
        this.controleExibicao[item.id] = !this.controleExibicao[item.id];
        this.exibeMostraTabela(item, this.controleExibicao[item.id]);
    }

    private adicionaChild(tbody, lancamento){
        let trs: HTMLCollection = tbody.getElementsByTagName('tr');
        let bolEncontrou = false;
        let indiceEncontrado = -1;
        for(let i = 0; i < trs.length; i++){
            if (trs[i].id == lancamento.id.toString()){
                bolEncontrou = true;
                indiceEncontrado = i;
            } else if (bolEncontrou && i < trs.length -1){
                this.criarLinhas(tbody, lancamento, trs[i]);
                break;
            }
        };

        if (bolEncontrou && indiceEncontrado == trs.length-1 ){
            this.criarLinhas(tbody, lancamento, null);
        }
    }

    private criarLinhas(tbody, lancamento: LancamentoVO, trParaInsercao) {
        let totalCred: number = 0.00;
        let totalDeb : number = 0.00;
        
        lancamento.lancamentosUtilizados.forEach(vo => {
            let tr = document.createElement('tr');
            tr.setAttribute('class', 'tr_child');
            tr.setAttribute('_ngcontent-c2', '');
            tr.innerHTML  = "<td class='fonte-destacada text-right' colspan='2'>" + vo.dataVencimentoStr + "</td>"
            tr.innerHTML += "<td class='fonte-destacada'>" + vo.descricao + "</td>"
            tr.innerHTML += "<td class='fonte-destacada'>" + vo.valorCreditoStr + "</td>"
            tr.innerHTML += "<td class='fonte-destacada'>" + vo.valorDebitoStr + "</td>"
            tr.innerHTML += "<td class='fonte-destacada'>"+  (vo.bolPaga ? "<i class='glyphicon glyphicon-thumbs-up'/>":"") +"</td>"
            tr.innerHTML += "<td class='fonte-destacada'>" + (vo.numDocumento ? vo.numDocumento : "") + "</td>"
            tr.innerHTML += "<td colspan='2' class='fonte-destacada'>" + vo.descFormaPagamento + "</td>"

            totalCred += vo.despesa ? 0 : vo.valor;
            totalDeb  += vo.despesa ? vo.valor : 0;

            this.insereLinha(tbody, tr, trParaInsercao);
        })

        let totalUsado : number = lancamento.despesa ? totalDeb : totalCred;

        this.criarTotalizador(tbody, totalUsado, lancamento.valor + totalUsado, trParaInsercao);
    }

    private insereLinha(tbody, trAlvo, trParaInsercao){
        if (trParaInsercao != null){
            tbody.insertBefore(trAlvo, trParaInsercao);
        } else {
            tbody.append(trAlvo);
        }

    }

    private criarTotalizador(tbody, totalGasto, totalGeral, trParaInsercao){

        let tr = document.createElement('tr');
        tr.setAttribute('class', 'tr_child borda sombra');
        tr.setAttribute('_ngcontent-c2', '');
        tr.innerHTML += "<td colspan='2' class='text-right fonte-destacada'>TOTAL JÁ UTILIZADO:</td>";
        tr.innerHTML +=`<td class='fonte-destacada'>${ Formatadores.formataMoeda(totalGasto) }</td>`;
        tr.innerHTML += "<td colspan='2' class='text-right fonte-destacada'>O GASTO TOTAL SERÁ DE:</td>";
        tr.innerHTML +=`<td class='fonte-destacada' colspan='3'>${ Formatadores.formataMoeda(totalGeral) }</td>`;
        this.insereLinha(tbody, tr, trParaInsercao);
    }

    exibeMostraTabela(lancamento: LancamentoVO, exibe: boolean){
        let tbody = document.getElementById('tbody');

        if (exibe){
            this.adicionaChild(tbody, lancamento);
        } else {
           this.removeFilhasTrsUtilizacao(tbody);
        }

    }    

    removeFilhasTrsUtilizacao(tbody){
        let trFilhas = document.getElementsByClassName('tr_child');
           while(trFilhas.length > 0){
               tbody.removeChild(trFilhas[0]);
           }        
    }
 
}
