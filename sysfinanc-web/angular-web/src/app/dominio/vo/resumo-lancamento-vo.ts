//import { GerenciadorPadraoVO } from "./gerenciador-padrao-vo";


export class ResumoLancamentosVO  {
     
    constructor(public totalDespesas: number = 0.00, public totalReceitas: number = 0.00, public mes?: number, public ano?:number, public saldo?:number){
        //super();
    }
} 