export class GravacaoArquivoDto {
    constructor(public arquivoBase64?: string, public strDataVencimento?: string, public banco?: number, public nomeArquivo?: string, public fileType?: string){}
}
