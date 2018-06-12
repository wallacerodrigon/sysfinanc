export class UtilizacaoLancamentoDTO {

    constructor(public idLancamentoOrigem: number,
            public valorUtilizacao: number,
            public dataUtilizacao: Date,
            public idFormaPagamento: number = 13
    ){}
    
}