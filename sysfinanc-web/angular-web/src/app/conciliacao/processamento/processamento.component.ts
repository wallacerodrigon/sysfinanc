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

declare var jQuery: any;

@Component({
  selector: 'app-processamento',
  templateUrl: './processamento.component.html',
  styleUrls: ['./processamento.component.css']
})
export class ProcessamentoComponent implements OnInit {

  private colunasPadrao: string[] = ["Descrição", "Data", "Documento", "C/D", "Valor", "Lançamentos"];
 
  private listagemExtrato: RegistroExtratoDto[] = [];
  private listaExtratoInteira: RegistroExtratoDto[] = [];
  private listagemNaoConciliados: LancamentoVO[] = [];
  private listagemConciliados: LancamentoVO[] = [];
  private listagemVerificacao: RegistroExtratoDto[] = [];

  private tamanhoExtrato: number = 0;

  private conteudoArquivoBase64: string = null;
  protected databaseFiltro: string;

  private paginaAtual: number = 1;
  
  @BlockUI() blockUI: NgBlockUI;   

  @ViewChild("arquivo") arquivo: ElementRef;
  @ViewChild("database") database: ElementRef;

  constructor(private servico: ConciliacaoServiceService, 
              private dialogService: DialogService,
              private lancamentoService: LancamentoService) { }

  ngOnInit() {
    this.databaseFiltro = UtilData.converterToString(new Date());
    this.database.nativeElement.value = this.databaseFiltro;
    
    jQuery(this.database.nativeElement).datepicker();
    this.tamanhoExtrato = 0;

  }

   associarExtratoLancamento(){

      let extratosAAtualizar: Array<RegistroExtratoDto> = this.listagemExtrato.filter(extrato => extrato.confirmado == false);

      extratosAAtualizar.forEach(dto => {

          if (dto.arrayIds != null){
              let lancamentos: Array<LancamentoVO> = dto.lancamentos;

              dto.lancamentos = lancamentos.filter(vo => dto.arrayIds.every(id => id == vo.id));
              delete dto.arrayIds;
          }

      });

      console.log(extratosAAtualizar);


      // if (extratosMarcados == null || extratosMarcados.length === 0 || 
      //   lancamentosNaoConciliados == null || lancamentosNaoConciliados.length === 0){
      //     new AlertaComponent(this.dialogService).exibirMensagem('Selecione um extrato e um lançamento não conciliado');
      //     return false;
      // }

      // if (extratosMarcados.length > 1){
      //   new AlertaComponent(this.dialogService).exibirMensagem('Selecione apenas um item do extrato');
      //   return false;
      // }

      // let totalExtrato: number = Formatadores.formataNumero( extratosMarcados[0].valor );
      // if (extratosMarcados[0].creditoDebito == 'D'){
      //   totalExtrato = totalExtrato * -1;
      // }
      // let totalNaoConciliado: number = 0.00;
      // lancamentosNaoConciliados.forEach(vo => totalNaoConciliado += vo.despesa ? vo.valor * -1 : vo.valor);

      // if (totalExtrato != totalNaoConciliado ){
      //     new AlertaComponent(this.dialogService).exibirMensagem('ATENÇÃO! O total do extrato não confere com o total selecionado dos não conciliados!');
      //     return false;        
      // }

      // let dataDocumento: string = extratosMarcados[0].dataLancamento;
      // let dadosData: Array<string> = dataDocumento.split('/');
      // this.efetivarAssociacao(extratosMarcados[0].documento, dadosData[0] +'/'+dadosData[1]+'/20'+dadosData[2]);
      //this.gerarVerificacaoConciliados(this.listaExtratoInteira);
   }

   private efetivarAssociacao(numDocumentoExtrato: string, dataDocumento: string){
    let lancamentosNaoConciliados: Array<LancamentoVO> = [];
    this.blockUI.start('Aguarde, efetuando a associação dos documentos.');

    this.listagemNaoConciliados.forEach(lancamento => {
      if (lancamento["selecionado"]){
        lancamento.numDocumento = numDocumentoExtrato;
        lancamento.dataVencimentoStr = dataDocumento;
        lancamento.bolConciliado = true;

        delete(lancamento["selecionado"]);

        this.lancamentoService.alterar(lancamento)
        .then(() => {
            this.listagemConciliados.push(lancamento);
            this.blockUI.stop();
          })
        .catch(erro => {
          this.blockUI.stop();
          new AlertaComponent(this.dialogService).exibirMensagem(erro._data);
        })
      } else {
        lancamentosNaoConciliados.push(lancamento);
      }
    })    
    this.listagemNaoConciliados = lancamentosNaoConciliados; 
   }
  
   private isConciliado(numDocumento: string): boolean {
     return this.listagemConciliados &&
            this.listagemConciliados.filter(vo => vo.numDocumento == numDocumento).length > 0;
   }

   protected efetuarUpload(){

        if (! this.conteudoArquivoBase64 || this.conteudoArquivoBase64.length === 0){
            new AlertaComponent(this.dialogService).exibirMensagem("Selecione um arquivo");
            return false;
        }

        this.blockUI.start('Aguarde. Montando as conciliações com o extrato do arquivo...');
        this.listagemExtrato = [];
        this.tamanhoExtrato = 0;
        this.listaExtratoInteira= [];

        this.servico.enviarArquivo(
                      new GravacaoArquivoDto(this.conteudoArquivoBase64, this.database.nativeElement.value, 1)
                    )
            .subscribe(dados => {
                dados.json().forEach(e => {
                  let dto: RegistroExtratoDto = new RegistroExtratoDto();
                  dto.transformar(e);
                  this.listagemExtrato.push(dto);

                });
                this.tamanhoExtrato = this.listagemExtrato.length;
                this.blockUI.stop();
            },
            erro => {
              new AlertaComponent(this.dialogService).exibirMensagem("Erro ao processar o arquivo.");
              this.blockUI.stop();
            });
   }

   private gerarVerificacaoConciliados(extrato: RegistroExtratoDto[]): any {
       this.listagemVerificacao = [];

       extrato.forEach(reg => {
           let total: number = 0.00;
           reg.lancamentos  = this.listagemConciliados.filter(vo => vo.numDocumento.trim() == reg.documento.trim());
           reg.lancamentos.forEach(vo => total += vo.descricao ? vo.valor * -1 : vo.valor);           
           reg.totalConciliado = total;
           this.listagemVerificacao.push(reg);
       });
       console.log(this.listagemVerificacao);
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

}
