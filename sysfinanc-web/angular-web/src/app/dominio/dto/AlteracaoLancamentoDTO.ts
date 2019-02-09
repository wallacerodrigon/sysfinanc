export class AlteracaoLancamentoDTO {
    idLancamento: number;
	dataVencimento: string;
	valor: number;
	numDocumento: string;
	idFormaPagamento: number;
	descricao: string;
	bolPago: boolean = false;
}