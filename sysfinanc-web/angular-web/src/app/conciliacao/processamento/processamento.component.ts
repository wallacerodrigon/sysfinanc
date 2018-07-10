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
  private tamanhoPagina: number = 10;

  private conteudoArquivoBase64: string = null;
  protected databaseFiltro: Date = new Date();
  private processando: boolean = false;

  private paginaAtual: number = 1;
  
  @BlockUI() blockUI: NgBlockUI;   

  @ViewChild("arquivo") arquivo: ElementRef;

  constructor(private servico: ConciliacaoServiceService, 
              private dialogService: DialogService,
              private lancamentoService: LancamentoService) { }

  ngOnInit() {
    this.tamanhoExtrato = 0;
  }

   associarExtratoLancamento(){

      let extratosAAtualizar: Array<RegistroExtratoDto> = this.listagemExtrato.filter(extrato => extrato.confirmado == false && extrato.arrayIds && extrato.arrayIds.length > 0);
      let temAlgumExtratoIncoerente: boolean = false;

      if (extratosAAtualizar.length > 0){
          extratosAAtualizar.forEach(dto => {
              let lancamentos: Array<LancamentoVO> = dto.lancamentos;

              dto.lancamentos = lancamentos.filter(vo => {
                if (dto.arrayIds.find(id => vo.id == id) > 0){
                  return vo;
                }
              });
          });
      } else {
          new AlertaComponent(this.dialogService).exibirMensagem('Selecione um extrato e um lançamento para conciliar');
      }
      
      this.efetivarAssociacao(extratosAAtualizar);
   }

   private efetivarAssociacao(extratosAAtualizar: Array<RegistroExtratoDto>){
        this.lancamentoService.associarLancamentos(extratosAAtualizar)
        .then( () => {
          new AlertaComponent(this.dialogService).exibirMensagem('Associações realizadas com sucesso');
          this.efetuarUpload();
        })
        .catch(erro => new AlertaComponent(this.dialogService).exibirMensagem(erro._body))
   }

   protected efetuarUpload(){

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
                dados.json().forEach(e => {
                  let dto: RegistroExtratoDto = new RegistroExtratoDto();
                  dto.transformar(e);
                  this.listagemExtrato.push(dto);

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
        if (lancamentoCadastrado){
            this.listagemExtrato
              .filter(dto => dto.confirmado == false)
              .forEach(dto => dto.lancamentos.push(lancamentoCadastrado));
        }
    }); 
  }
  
  protected limpar(dto: RegistroExtratoDto): void {
    dto.arrayIds = [];
  }

}
