import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { LancamentoVO } from '../../dominio/vo/lancamento-vo';
import {Constantes} from '../../utilitarios/constantes';
import {AlertaComponent} from '../../componentes/mensagens/alert.component';
import {UtilData} from '../../utilitarios/util-data';
import { UtilizacaoParcelasDto } from '../../dominio/dto/utilizacao-parcelas-dto';
import { Formatadores } from '../../utilitarios/formatadores';
import { LancamentoService } from '../lancamento.service';
import { FiltraParcelasDto } from '../../dominio/dto/filtra-parcelas-dto';

declare var jQuery: any;

@Component({
  selector: 'app-utilizacao',
  templateUrl: './utilizacao.component.html',
  styleUrls: ['./utilizacao.component.css']
})
export class UtilizacaoComponent extends DialogComponent<null, LancamentoVO> implements OnInit {

  public lancamento: LancamentoVO = new LancamentoVO();
  protected utilizacaoDto: UtilizacaoParcelasDto = new UtilizacaoParcelasDto();
  public funcaoCallBack: Function;
  public bolListaLancamentos: boolean = false;
  public dataBaseLancamentos: Date = null;
  private listaLancamentos: Array<LancamentoVO> = [];
  private idLancamento: number = 0;

  @ViewChild("dataUtilizacao") dataUtilizacao: ElementRef;
  @ViewChild("valorUtilizadoStr") valorUtilizadoStr: ElementRef;

  constructor(protected dialogService: DialogService, 
      protected lancamentoService: LancamentoService ) { 
    super(dialogService);
  }

  fechar(){
    this.result = null;
    this.close();
  }
 
  ngOnInit() {
      jQuery(this.dataUtilizacao.nativeElement).datepicker();
      
      if (this.lancamento.bolPaga){
        new AlertaComponent(this.dialogService).
        exibirMensagem("Lançamento já liquidado. Não pode ser utilizado!");
        this.fechar();
        return;
      }
      this.dataUtilizacao.nativeElement.value = UtilData.converterToString(new Date());

      if (this.bolListaLancamentos){
         this.dataBaseLancamentos = new Date();
         this.carregarLancamentos();
      }
    }

  private carregarLancamentos(){
    this.lancamentoService.filtrar(
            new FiltraParcelasDto(this.dataBaseLancamentos.getMonth()+1, this.dataBaseLancamentos.getFullYear())
       )
      .subscribe(lancamentos => {
        let retornoJSON = lancamentos.json();
        this.listaLancamentos = retornoJSON.lancamentos.filter(vo => vo.idParcelaOrigem == null || vo.idParcelaOrigem == vo.id);
      });
  }

  private recuperarLancamento(): LancamentoVO {
      return this.listaLancamentos.find(vo => vo.id == this.idLancamento);
  }

  protected registrar(){
      this.utilizacaoDto.dataUtilizacaoStr = this.dataUtilizacao.nativeElement.value;
      this.utilizacaoDto.valorUtilizadoStr = this.valorUtilizadoStr.nativeElement.value;

      this.result = null;

      if (this.bolListaLancamentos){
         this.lancamento = this.recuperarLancamento();
      }

      if (this.lancamento ==null || this.lancamento.id == null ||
          this.utilizacaoDto.dataUtilizacaoStr == "" || this.utilizacaoDto.descricao.trim() == "" ||
          this.utilizacaoDto.valorUtilizado == null || this.utilizacaoDto.idFormaPagamento == null ){
            new AlertaComponent(this.dialogService).
                exibirMensagem("Informe todos os dados marcados com (*) para continuar!");
            return;
      }

      if (this.utilizacaoDto.valorUtilizado > this.lancamento.valor){
          
          new AlertaComponent(this.dialogService).
              exibirMensagem("Valor deve ser inferior a " + Formatadores.formataMoeda(this.lancamento.valor) );
          return;
      }

      this.utilizacaoDto.idLancamentoOrigem = this.lancamento.id;

      this.lancamentoService.utilizar(this.utilizacaoDto)
          .then((lista) => {
            new AlertaComponent(this.dialogService).
                exibirMensagem("Utilização realizada com sucesso!");

            this.result = Object.assign(new LancamentoVO(), lista[1]);
            this.close();
          })
          .catch( erro => {
            new AlertaComponent(this.dialogService).
                exibirMensagem("Erro: " + erro._body);
          })
        
  }
 
}
