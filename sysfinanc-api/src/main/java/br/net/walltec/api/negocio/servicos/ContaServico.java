package br.net.walltec.api.negocio.servicos;

import java.util.List;

import br.net.walltec.api.dto.GeracaoParcelasDto;
import br.net.walltec.api.entidades.Conta;
import br.net.walltec.api.entidades.Lancamento;
import br.net.walltec.api.entidades.TipoConta;
import br.net.walltec.api.excecoes.NegocioException;
import br.net.walltec.api.negocio.servicos.comum.CrudPadraoServico;
import br.net.walltec.api.vo.RubricaVO;

public interface ContaServico extends CrudPadraoServico<Conta, RubricaVO> {

	/**
	 * Cria n parcelas e retorna as geradas
	 * @param conta
	 * @param qtd
	 * @param dataVencimentoInicial
	 * @param valorVencimento
	 * @throws NegocioException
	 */
	List<Lancamento> criarParcelas(GeracaoParcelasDto dto) throws NegocioException;

	Integer gerarNumeroProxLancamento(Conta conta) throws NegocioException;
	
}
