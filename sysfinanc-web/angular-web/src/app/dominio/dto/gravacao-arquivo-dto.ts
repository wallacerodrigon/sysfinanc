export class GravacaoArquivoDto {
    constructor(public arquivoBase64: any = null, public strDataVencimento: string, public banco: number = null){}
}