//import { GerenciadorPadraoVO } from "./gerenciador-padrao-vo";

export class LancamentoVO  {

    constructor(
        public  id: number = null,
        public  numero: number = null,
        public  dataVencimentoStr: string = null,
        public  idConta: number = null,
        public  descConta: string = null,
        public  valor: number = null,
        public  valorCreditoStr: string = null,
        public  valorDebitoStr: string = null,
        public  idParcelaOrigem: number = null,
        public  descricao: string = null,
        public  bolPaga: boolean = false,
        public  bolConciliado: boolean = false,
        public  numDocumento: string = null,
        public  despesa: boolean =false,
        public  dataFimStr: string = null,
        public idFormaPagamento?: number,
        public descFormaPagamento?: string,
        public lancamentosUtilizados: Array<LancamentoVO> = [],
        public descStatus: string = ""
    ){
      //  super();
    }


    public get bolPagaStr(): string {
        return this.bolPaga ? "SIM" : "NÃO";
    }

    public get bolPagaIcone(): string {
        return this.bolPaga ? 'glyphicon glyphicon-thumbs-up' : '';
    }

    public get valorStr(): string {
        return this.despesa ? this.valorDebitoStr : this.valorCreditoStr;
    }

    public get creditoDebito(): string {
        return this.despesa ? "D":"C";
    }

    public descCombo(): string {
        return this.descricao + '-' + this.valorStr;
    }

}