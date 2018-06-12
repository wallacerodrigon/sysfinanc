export class SaldoLancamento {
    constructor(
        public dataReferencia: Date = new Date(),
        public totalReceita: number = 0.0,
        public totalDespesa: number = 0.00){}

    getSaldo(){
        return this.totalReceita - this.totalDespesa;
    }
}