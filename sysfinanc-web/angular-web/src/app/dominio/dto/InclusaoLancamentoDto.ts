export class InclusaoLancamentoDto {
    idRubrica: number;
	idFormaPagamento: number;
	descricao: string;
	bolPaga: boolean;
	dataVencimento: string;
	valor: number;
	numDocumento?: string;
	bolRepete?: boolean = false;
	dataFimRepeticao?: string;
}