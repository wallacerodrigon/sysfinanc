export class LancamentoVO {
    constructor(
        public idLancamento: number = null,
        public descricao: string = null,
        public dataVencimento: string = null,
        public valorVencimento: number = null,
        public valorUtilizado: number = null,
        public bolPaga : boolean = null,
        public idUsuario: number = null
    ){}


}

/*{"descFormaPagamento":"A Vista","numero":46,"dataPagamento":1498480025519,"valorVencimento":512.25,
"bolDespesa":true,"id":6552,"descricao":"escola da maria eduarda","dataVencimento":"2017-06-01",
"valorUtilizado":0.0,"bolPaga":true}*/