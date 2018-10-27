import {LancamentoVO} from '../entidades/lancamentoVO';

export class LancamentoDTO {
    constructor(public idLancamento: number = null,
                public descricao: string = null,
                public idUsuario: number = null,
                public dataVencimento: Date = null,
                public valorVencimento: number = null){

    }

    converter(lancamento: LancamentoVO){
        return new LancamentoDTO(
                    lancamento.idLancamento, 
                    lancamento.descricao,
                    lancamento.idUsuario,
                    new Date(lancamento.dataVencimento),
                    lancamento.valorVencimento
                    );
    }

    
}