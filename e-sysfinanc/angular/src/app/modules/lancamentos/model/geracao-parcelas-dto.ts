export class GeracaoParcelasDto {

    constructor(
        public idConta:number = null,
        public quantidade:number = null,
        public dataVencimentoStr:string = null,
        public valorVencimento: number = null,
        public idParcelaOrigem:number = null,
        public parcial: boolean = false,
        public idUsuario:number = null,
        public descricaoParcela: string = null
    ){
        
    }
}