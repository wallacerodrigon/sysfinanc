export class RubricaVO  {

    constructor(public id: number = null,
        public dataCadastroStr: string = null,
        public descricao: string = null,
        public idTipoConta: number = null,
        public descTipoConta: string = null,
        public despesa: boolean = true){
            
        }

    public get descricaoCombo(): string {
        return this.descricao.toLocaleUpperCase() + ' ['+ (this.despesa? "DESPESA" :"RECEITA") + ']';
    }
    
}