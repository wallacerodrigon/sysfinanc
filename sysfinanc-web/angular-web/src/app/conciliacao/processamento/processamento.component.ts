import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CrudComponente } from '../../componentes/crud-componente/crud-componente.component';
import { ConciliacaoServiceService } from '../conciliacao-service.service';
import { GravacaoArquivoDto } from '../../dominio/dto/gravacao-arquivo-dto';
import { RequestOptionsArgs } from '@angular/http/src/interfaces';
import { RegistroExtratoDto } from '../../dominio/dto/registro-extrato-dto';
import { LancamentoVO } from '../../dominio/vo/lancamento-vo';
import { LancamentoService } from '../../lancamentos/lancamento.service';
import { FiltraParcelasDto } from '../../dominio/dto/filtra-parcelas-dto';
import { UtilData } from '../../utilitarios/util-data';
import { UtilObjeto } from '../../utilitarios/util-objeto';
import { Formatadores } from '../../utilitarios/formatadores';
import { AlertaComponent } from '../../componentes/mensagens/alert.component';
import { DialogService } from 'ng2-bootstrap-modal/dist/dialog.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { CadastroComponent } from '../../lancamentos/cadastro/cadastro.component';
import { ConfirmComponent } from '../../componentes/mensagens/confirm.component';
import { Constantes } from '../../utilitarios/constantes';

declare var jQuery: any;

@Component({
  selector: 'app-processamento',
  templateUrl: './processamento.component.html',
  styleUrls: ['./processamento.component.css']
})
export class ProcessamentoComponent implements OnInit {

  private colunasPadrao: string[] = ["Descrição", "Data", "Documento", "C/D", "Valor", "Lançamentos", "Ações"];
 
  private listagemExtrato: RegistroExtratoDto[] = [];
  private listaExtratoInteira: RegistroExtratoDto[] = [];
  private listagemNaoConciliados: LancamentoVO[] = [];
  private listagemConciliados: LancamentoVO[] = [];
  private listagemVerificacao: RegistroExtratoDto[] = [];

  private tamanhoExtrato: number = 0;
  private tamanhoPagina: number = 6;

  private conteudoArquivoBase64: string = null;
  protected databaseFiltro: Date = new Date();
  private processando: boolean = false;
  private mesFechado: boolean = false;

  private paginaAtual: number = 1;
  private totalConciliado: number = 0.00;
  
  @BlockUI() blockUI: NgBlockUI;   

  @ViewChild("arquivo") arquivo: ElementRef;

  constructor(private servico: ConciliacaoServiceService, 
              private dialogService: DialogService,
              private lancamentoService: LancamentoService) { }

  ngOnInit() {
    this.tamanhoExtrato = 0;
  }

   associarExtratoLancamento(){

      let extratosAAtualizar: Array<RegistroExtratoDto> = 
                                        this
                                        .listagemExtrato
                                        .filter(extrato => 
                                          !extrato.conciliado && 
                                          extrato.confirmado && 
                                          extrato.arrayIds &&
                                          extrato.arrayIds.length > 0);

      if (extratosAAtualizar.length > 0){
          extratosAAtualizar.forEach(dto => {
              let lancamentos: Array<LancamentoVO> = dto.lancamentos;

              dto.lancamentos = lancamentos.filter(vo => {
                if (dto.arrayIds.find(id => vo.id == id) > 0){
                  return vo;
                }
              });
          });
          this.efetivarAssociacao(extratosAAtualizar);
      } else {
          new AlertaComponent(this.dialogService).exibirMensagem('Selecione um extrato e um lançamento para conciliar');
      }
      
   }

   private efetivarAssociacao(extratosAAtualizar: Array<RegistroExtratoDto>){
        this.lancamentoService.associarLancamentos(extratosAAtualizar)
        .then( () => {
          new AlertaComponent(this.dialogService).exibirMensagem('Associações realizadas com sucesso');
          this.efetuarUpload();
        })
        .catch(erro => {
            new AlertaComponent(this.dialogService).exibirMensagem("Ocorreu um erro ao realizar a(s) associação(ões).")
        })
   }

   private desfazerAssociacao(){
    let disposable = this.dialogService.addDialog(ConfirmComponent, {
      title:'Desconciliar', 
      message: 'Deseja realmente desfazer a conciliação deste mês?' })
      .subscribe(confirmado=> {
          if (confirmado){
            this.efetuarCancelamentoConciliacao();
          }

      });
   }

   private efetuarCancelamentoConciliacao(){
    let strData: string = UtilData.converterDataUSAToBR( this.databaseFiltro.toString() );
    let mes: number = Number(strData.split("/")[1]);
    let ano: number =  Number(strData.split("/")[2]);
    this.lancamentoService.desfazerAssociacoes(mes, ano)
    .then( () => {
      new AlertaComponent(this.dialogService).exibirMensagem('Associações desfeitas com sucesso');
      this.efetuarUpload();
    })
    .catch(erro => {
      console.log(erro);
      new AlertaComponent(this.dialogService).exibirMensagem("Ocorreu um erro ao desfazer as conciliações!");
    })
   }    

   protected efetuarUpload(){
        this.totalConciliado = 0;

        if (! this.conteudoArquivoBase64 || this.conteudoArquivoBase64.length === 0){
            new AlertaComponent(this.dialogService).exibirMensagem("Selecione um arquivo");
            return false;
        }

        if (this.databaseFiltro == null){
          new AlertaComponent(this.dialogService).exibirMensagem("Selecione uma data");
          return false;
        }

        this.blockUI.start('Aguarde. Montando as conciliações com o extrato do arquivo...');
        this.listagemExtrato = [];
        this.tamanhoExtrato = 0;
        this.listaExtratoInteira= [];
        let strData: string = UtilData.converterDataUSAToBR( this.databaseFiltro.toString() );

        this.servico.enviarArquivo(
                      new GravacaoArquivoDto(this.conteudoArquivoBase64, strData, 1)
                    )
            .subscribe(dados => {
                let data = dados.json();
                this.mesFechado = data.mesEstaFechado;
                data.dadosArquivo.forEach(e => {
                  let dto: RegistroExtratoDto = new RegistroExtratoDto();
                  dto.transformar(e);
                  this.listagemExtrato.push(dto);
                  if (dto.conciliado){
                     this.totalConciliado += dto.valorExtrato;
                  }

                });
                this.tamanhoExtrato = this.listagemExtrato.length;
                this.processando = true;
                this.blockUI.stop();
            },
            erro => {
              new AlertaComponent(this.dialogService).exibirMensagem("Erro ao processar o arquivo.");
              this.blockUI.stop();
            });
   }

   private onFileChange(event) {
    let reader = new FileReader();
    if(event.target.files.length > 0) {
      let file = event.target.files[0];
      this.conteudoArquivoBase64 = file;
      reader.readAsDataURL(file);
      reader.onload = () => {
          this.conteudoArquivoBase64 = reader.result.split(',')[1];
      };      
    }
  }
  
  private novoCadastro(){
    this.dialogService.addDialog(CadastroComponent, {
      mostraBlocoRepetir: false,
      consideraPago: true
    })
    .subscribe(lancamentoCadastrado => {
        if (lancamentoCadastrado && lancamentoCadastrado.idFormaPagamento == Constantes.DEBITO_CONTA){
            this.listagemExtrato
              .filter(dto => dto.confirmado == false)
              .forEach(dto => dto.lancamentos.push(lancamentoCadastrado));
        }
    }); 
  }
  
  protected limpar(dto: RegistroExtratoDto): void {
    dto.arrayIds = [];
  }

  protected calcularTotal(lancamentos: Array<LancamentoVO>): number {
    if (lancamentos.length > 0){
      return lancamentos.reduce( (total, vo) => total += vo.valor, 0.00);
    }
    return 0.00;
  }

  private marcarLancamentoParaAssociar(dto: RegistroExtratoDto, lancamento: LancamentoVO, event: any){
    let selecionado: boolean = event.target.checked;
    if (selecionado){
        if (! dto.arrayIds.find(id => id === lancamento.id) ){
          dto.arrayIds.push(lancamento.id);        
        }
    } else {
      dto.arrayIds.forEach((id, index) => {
        if (id === lancamento.id){
          dto.arrayIds.splice(index, 1);
        }
      })
    }
    dto.confirmado = dto.arrayIds.length > 0;
  }
 

}
