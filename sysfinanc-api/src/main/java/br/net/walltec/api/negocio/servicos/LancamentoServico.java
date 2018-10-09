/**
 * 
 */
package br.net.walltec.api.negocio.servicos;


import java.util.List;
import java.util.Set;

import br.net.walltec.api.dto.FiltraParcelasDto;
import br.net.walltec.api.dto.GeracaoParcelasDto;
import br.net.walltec.api.dto.MapaDashboardDTO;
import br.net.walltec.api.dto.RegistroExtratoDto;
import br.net.walltec.api.dto.ResumoDetalhadoMesAnoDTO;
import br.net.walltec.api.dto.ResumoMesAnoDTO;
import br.net.walltec.api.dto.TipoContaNoMesDTO;
import br.net.walltec.api.dto.UtilizacaoParcelasDto;
import br.net.walltec.api.entidades.Lancamento;
import br.net.walltec.api.excecoes.NegocioException;
import br.net.walltec.api.negocio.servicos.comum.CrudPadraoServico;
import br.net.walltec.api.rest.dto.filtro.DesfazimentoConciliacaoDTO;
import br.net.walltec.api.rest.dto.filtro.RegistroFechamentoMesDTO;
import br.net.walltec.api.vo.LancamentoVO;
import br.net.walltec.api.vo.UtilizacaoLancamentoVO;

/**
 * @author Wallace
 *
 */
public interface LancamentoServico extends CrudPadraoServico<Lancamento, LancamentoVO> {
	
	List<LancamentoVO> listarParcelas(FiltraParcelasDto dtoFiltro) throws NegocioException;
	
	boolean baixarParcelas(List<Integer> idsLancamentos) throws NegocioException;

	boolean excluirParcelas(List<Integer> idsLancamentos) throws NegocioException;
	
	List<LancamentoVO> utilizarLancamento(UtilizacaoParcelasDto dtoUtilizacao) throws NegocioException;
	
	List<UtilizacaoLancamentoVO> listarHistoricoUso(Integer idLancamento) throws NegocioException;
	
	List<Lancamento>  montarListaLancamentos( GeracaoParcelasDto dto ) throws NegocioException;
	
	List<LancamentoVO> montarListaLancamentosVO( GeracaoParcelasDto dto ) throws NegocioException;	
	
	MapaDashboardDTO montarDashboards(Integer mes, Integer ano) throws NegocioException;
	
	List<LancamentoVO> gerarLancamentos(GeracaoParcelasDto dto) throws NegocioException;
	
	void associarLancamentos(List<RegistroExtratoDto> lancamentos) throws NegocioException;

	/**
	 * @param desfazimentoDTO
	 */
	void desfazerConciliacoes(DesfazimentoConciliacaoDTO desfazimentoDTO) throws NegocioException;

	/**
	 * @param fechamentoDTO
	 */
	void fecharMes(RegistroFechamentoMesDTO fechamentoDTO) throws NegocioException;
	
	boolean isMesFechado(int mes, int ano) throws NegocioException;
	
	Set<TipoContaNoMesDTO> getResumoPorTipoConta(List<Lancamento> lancamentos) throws NegocioException;

	/**
	 * @param ano
	 * @return
	 */
	List<ResumoMesAnoDTO> gerarMapaAno(Integer ano) throws NegocioException;
	
}
