import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { LancamentoVO } from '../../dominio/vo/lancamento-vo';
import {Constantes} from '../../utilitarios/constantes';
import {AlertaComponent} from '../../componentes/mensagens/alert.component';
import {UtilData} from '../../utilitarios/util-data';
import { UtilizacaoParcelasDto } from '../../dominio/dto/utilizacao-parcelas-dto';
import { Formatadores } from '../../utilitarios/formatadores';
import { LancamentoService } from '../lancamento.service';

declare var jQuery: any;

@Component({
  selector: 'app-utilizacao',
  templateUrl: './utilizacao.component.html',
  styleUrls: ['./utilizacao.component.css']
})
export class UtilizacaoComponent extends DialogComponent<null, boolean> implements OnInit {

  public lancamento: LancamentoVO = new LancamentoVO();
  protected utilizacaoDto: UtilizacaoParcelasDto = new UtilizacaoParcelasDto();
  public funcaoCallBack: Function;

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
      this.utilizacaoDto.idLancamentoOrigem = this.lancamento.id;
      this.dataUtilizacao.nativeElement.value = UtilData.converterToString(new Date());

     // this.valorUtilizadoStr.nativeElement.value = Formatadores.formataMoeda(this.lancamento.valor );
    }


  protected registrar(){
      this.utilizacaoDto.dataUtilizacaoStr = this.dataUtilizacao.nativeElement.value;
      this.utilizacaoDto.valorUtilizadoStr = this.valorUtilizadoStr.nativeElement.value;
      this.result = false;

      if (this.utilizacaoDto.valorUtilizado > this.lancamento.valor){
          
          new AlertaComponent(this.dialogService).
              exibirMensagem("Valor deve ser inferior a " + Formatadores.formataMoeda(this.lancamento.valor) );
          return;
      }

      if (this.utilizacaoDto.dataUtilizacaoStr == "" || this.utilizacaoDto.descricao.trim() == "" ||
          this.utilizacaoDto.valorUtilizado == null || this.utilizacaoDto.idFormaPagamento == null ){
            new AlertaComponent(this.dialogService).
                exibirMensagem("Informe todos os dados para continuar!");
            return;
          
          }


      this.lancamentoService.utilizar(this.utilizacaoDto)
          .then((lista) => {
            new AlertaComponent(this.dialogService).
                exibirMensagem("Utilização realizada com sucesso!");
            this.result = true;
            this.close();
          })
          .catch( erro => {
            new AlertaComponent(this.dialogService).
                exibirMensagem("Erro: " + erro._body);
          })
        
  }
 
}
