import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { DialogService, DialogComponent } from "ng2-bootstrap-modal";  
import { ConfirmComponent } from '../mensagens/confirm.component';
import { Pipe } from '@angular/core';
import { AcoesRegistroTabela } from '../../componentes/crud-componente/acoes-registro-tabela';

@Component({
  selector: 'app-crud-componente',
  templateUrl: './crud-componente.component.html',
  styleUrls: ['./crud-componente.component.css'],
})
export class CrudComponente implements OnInit {

    //parâmetros de configuração
    @Input() nomesColunas: Array<string>;
    @Input() atributosColunas: Array<string>;
    @Input() exibeFiltro: boolean = false;
    @Input() listaDados: Array<any>;
    @Input() totalizadores: Array<any>;
    @Input() tamanhoListagem: number = 0;
    @Input() exibeNovo: boolean = false;
    @Input() exibeAcoes: boolean = false;
    @Input() exibeExcluir: boolean = false;
    @Input() exibeEditar: boolean = false;
    @Input() listaAcoes: Array<AcoesRegistroTabela> = [];
    @Input() exibeCheckboxes: boolean = false;
    @Input() exibeTotalizadores: boolean = false;

//eventos
    @Output() onExcluir = new EventEmitter<any>();
    @Output() onEditar = new EventEmitter<any>();
    @Output() onNovoRegistro = new EventEmitter();
    @Output() onFilter = new EventEmitter();
    @Output() onList = new EventEmitter();

    
    public paginaAtual = 1;
    public itensPorPagina = 5;
    public indiceItem: number = -1;
    public itemSelecionado: any; 
    public target: any;
    public indicePagina: number = -1;

  constructor(public dialogService:DialogService) { }

  ngOnInit() {

  }

  excluir(item: any, indice: number){
      let disposable = this.dialogService.addDialog(ConfirmComponent, {
          title:'Exclusão', 
          message: 'Confirma a exclusão do registro?' })
          .subscribe(confirmado=> {
              this._configurarItemSelecionado(item, indice);
              this.onExcluir.emit(confirmado ? item : null);
          });
      setTimeout(()=>{
          disposable.unsubscribe();
      },10000);       
  }

  editar(item:any, indice: number){
        this._configurarItemSelecionado(item, indice);
        this.onEditar.emit(item);
  }

  abrirNovoRegistro(){
      this.onNovoRegistro.emit();
  }

  abrirFiltro(){
      this.onFilter.emit();
  }

  executarAcao(item: any, indice: number, acaoExecutar: Function, callBack?: Function){
      if (acaoExecutar != null){
          acaoExecutar(item, indice, this.dialogService, callBack);
      } else {
          console.log("evento vazio");
      }
  }

  private _configurarItemSelecionado(item: any, indice: number){
        let indiceCalculado = this.paginaAtual === 1 ? indice : ((this.paginaAtual -1)* this.itensPorPagina)+indice;
        this.indiceItem = indiceCalculado;
        this.itemSelecionado = item;   
        this.indicePagina = indice;   
  }

  limparFiltro(){
        this.onList.emit();
  }

  get totalPaginas(): number {
       let qtdPaginas : number =  Math.trunc(this.listaDados.length / this.itensPorPagina);
       let resto: number = this.listaDados.length % this.itensPorPagina != 0 ? 1 : 0;

        return this.listaDados && this.listaDados.length > 0 ? qtdPaginas + resto : 0;
  }

  public selectAll(event: Event){
      let selecionado: boolean = event.target['checked'];
      
      this.listaDados.forEach(dado => dado.selecionado = selecionado);
  }

  public selectItem(item: any){
      item.selecionado = !item.selecionado;
  }

  private getClasse(item: any, nomeCampo: string): string {
    if (this.isIcone(item[nomeCampo])){
        return item[nomeCampo].split(':')[1];
    }
    return "";

  }

  private getValor(item: any, nomeCampo: string): string {
    if (this.isIcone(item[nomeCampo])){
        return "";
    }
    return item[nomeCampo];
  }

  private isIcone(valor: string): boolean {
    return (valor && valor != null && typeof(valor) == 'string' && valor.indexOf('icone') > -1);
  }
}
