export class ResumoVO {
    
    constructor(
        public receitaTotal: number = 0.0,
        public despesaTotal: number = 0.0,
        public recPagas: number = 0.0, 
        public recNaoPagas:number = 0.0,
        public despPagas: number = 0.0,
        public despNaoPagas: number = 0.0
        ){}
}