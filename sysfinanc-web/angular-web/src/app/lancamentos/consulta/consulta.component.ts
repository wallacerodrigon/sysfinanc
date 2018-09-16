import { Component, OnInit, EventEmitter,ViewChild } from '@angular/core';
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

@Component({
  selector: '..-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {

    //falta informar se é debito ou crédito
  private colunas: string[] = ["Data Vencimento", "Descrição", "Crédito", "Débito", "Pago", "Num.Doc."];
  private listagem: Array<LancamentoVO> = [];
  private listagemOriginal: Array<LancamentoVO> = [];

  private indicesValores: number[] = [3, 4, 5];
  private habilitaEdicao: boolean = false;

  private tamanhoListagem: number = 0;
  private atributos: Array<string> = ["dataVencimentoStr", "descricao", "valorCreditoStr", "valorDebitoStr", "bolPagaIcone", "numDocumento"];
  private totalizadores: Array<number> = [];

    private valor: string = "0,00";
    private mesFechado: boolean = false;

  protected listaAcoes: Array<AcoesRegistroTabela> = [
    //  {nomeAcao:"Clonar", classeCss:"glyphicon glyphicon-eye-open", eventoAcao: this.abrirUsosLancamento},      
      {nomeAcao:"Utilizar", classeCss:"glyphicon glyphicon-scissors", eventoAcao: this.abrirUtilizacaoLancamento, callBack: this.filtrar},
      {nomeAcao:"Histórico de Usos", classeCss:"glyphicon glyphicon-eye-open", eventoAcao: this.abrirUsosLancamento}
  ];
  
  @BlockUI() blockUI: NgBlockUI;  

  private resumos: Array<any> = [
      {nome:"Créditos", valor: "0,00", cor:"#00f", filtro:"TR"}, 
      {nome:"A Receber", valor: "0,00", cor:"#00f", filtro:"AR"}, 
      {nome:"Já Recebido", valor: "0,00", cor:"#00f", filtro:"RE"}, 
      {nome:"Débitos", valor: "0,00", cor:"#f00", filtro:"TD"},
      {nome:"A pagar", valor: "0,00", cor:"#f00", filtro:"AP"}, 
      {nome:"Já Pago", valor: "0,00", cor:"#f00", filtro:"PG"}, 
      {nome:"Saldo Final", valor: "0,00", cor:"#0f0", filtro:"-"}, 
      {nome:"A conciliar", valor: "0,00", cor:"#f00", filtro:"NC"},
      {nome:"Disponível no BB", valor: "0,00", cor:"#00f", filtro:"TC"},
      {nome:"Disponível no BB - A pagar", valor: "0,00", cor:"#00f", filtro:""},
  ];

  private mes: number;
  private ano: number;

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

  public abrirUtilizacaoLancamento(item: any, indice: number, dialogService: DialogService, callBack?: Function){
      dialogService.addDialog(UtilizacaoComponent, {
          lancamento: item
      }).subscribe(efetuado => {
          if (efetuado){
            window.location.reload(true);
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
            this.listagem[this.crudComponente.indiceItem] = objSalvo;
            this.calcularTotalizadores();
            this.montarResumo();
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

  private excluir(lancamentoAExcluir: LancamentoVO): any{
      if (lancamentoAExcluir != null){
          
          if (lancamentoAExcluir.bolConciliado){
            new AlertaComponent(this.dialogService).exibirMensagem('Registro já foi conciliado e não pode ser excluído!');
            return false;
          }
          this.blockUI.start('Excluindo registro. Aguarde!');
          this.servico.excluir(lancamentoAExcluir.id)
            .then( () => {
                this.blockUI.stop();
                this.listagem.splice(this.crudComponente.indiceItem, 1);
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
      let saldo: number = 0.00;

      this.listagem.forEach(vo => {
            if (vo.despesa){
                totalDebitos += vo.valor;
            } else {
                totalCreditos += vo.valor;
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

            if (vo.bolConciliado){
                totalCredConciliado += vo.valor;
            } else {
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
    this.resumos[9].valor = this.resumos[8].valor - totalPagar;
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
        alert(Formatadores.formataMoeda(valor));
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
 
}
