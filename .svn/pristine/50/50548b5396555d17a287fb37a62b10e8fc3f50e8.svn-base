import { DtoPadrao } from "./dto-padrao";
import { Formatadores } from "../../utilitarios/formatadores";

export class UtilizacaoParcelasDto extends DtoPadrao {

    constructor(public idLancamentoOrigem: number = null,
                public valorUtilizado: number = null,
                public dataUtilizacaoStr: string = null,
                public descricao: string = null){
        super();
    }

    public set valorUtilizadoStr(value: string){
        if (value && value.trim() != ""){
            this.valorUtilizado = Formatadores.formataNumero(value);
        } else {
            this.valorUtilizado = 0;
        }
    }
}