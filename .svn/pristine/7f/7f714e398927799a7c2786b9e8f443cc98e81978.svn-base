import { Formatadores } from "../../utilitarios/formatadores";
import { LancamentoVO } from "../vo/lancamento-vo";

export class RegistroExtratoDto {

    constructor(public dataLancamento: string = null, 
        public historico: string = null,   
        public documento: string = null, 
        public valor: string = null,
        public totalConciliado: number = null,
        public creditoDebito: string = null,
        public listaLancamentos: Array<LancamentoVO> = null){}

    public transformar(elem: any): RegistroExtratoDto {
        Object.assign(this, elem);
        return this;
    } 
 
    public get totalConciliadoStr(): string {
        return this.totalConciliado ? Formatadores.formataMoeda(this.totalConciliado) : "0,00";
    }

    public get temDiferenca(): string {
        let totalConciliado = this.creditoDebito == 'D' ? this.totalConciliado * -1 : this.totalConciliado;
        return totalConciliado != Formatadores.formataNumero(this.valor) ? "X":"";
    }

    public get textoLancamentos(): string {
        if (this.listaLancamentos != null){
            let texto: string = "";
            this.listaLancamentos.forEach(vo => {
                texto+= vo.descricao.substr(1,10)+"...\n";
            })
            return texto;
        } else {
            return "";
        }
    }
}