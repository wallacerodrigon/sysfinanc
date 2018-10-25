export class LancamentosPorRubricaDTO {

    constructor(public ano?: number, public descMes?: string,
                public descConta?: string, public totalDoMes?: number,
                public percentualDoTotal?: number, public mes?: number){

    }

    public static associar(obj: any): LancamentosPorRubricaDTO {
        return Object.assign(new LancamentosPorRubricaDTO(), obj);
    }

    public get descMesAno(): string {
        return `${this.descMes}/${this.ano}`;
    }
}