/**
 * 
 */
package br.net.walltec.api.rest;

import javax.inject.Inject;
import javax.interceptor.Interceptors;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import br.net.walltec.api.excecoes.WebServiceException;
import br.net.walltec.api.negocio.servicos.TipoContaServico;
import br.net.walltec.api.negocio.servicos.comum.CrudPadraoServico;
import br.net.walltec.api.rest.comum.RequisicaoRestPadrao;
import br.net.walltec.api.rest.interceptors.RequisicaoInterceptor;
import br.net.walltec.api.vo.TipoContaVO;

/**
 * @author wallace
 *
 */


@Path("/tiposContas")
@Produces(value=MediaType.APPLICATION_JSON)
@Interceptors({RequisicaoInterceptor.class})
public class TipoContaRest extends RequisicaoRestPadrao<TipoContaVO> {

	@Inject
	private TipoContaServico servico;
	
	/* (non-Javadoc)
	 * @see br.net.walltec.api.rest.comum.ContratoPadraoRest#incluir(br.net.walltec.api.vo.GerenciadorPadraoVO)
	 */
	@Override
	public Response incluir(TipoContaVO objeto) throws WebServiceException {
		// TODO Auto-generated method stub
		return null;
	}

	/* (non-Javadoc)
	 * @see br.net.walltec.api.rest.comum.ContratoPadraoRest#alterar(br.net.walltec.api.vo.GerenciadorPadraoVO)
	 */
	@Override
	public Response alterar(TipoContaVO objeto) throws WebServiceException {
		// TODO Auto-generated method stub
		return null;
	}

	/* (non-Javadoc)
	 * @see br.net.walltec.api.rest.comum.ContratoPadraoRest#excluir(java.lang.Integer)
	 */
	@Override
	public Response excluir(Integer idChaveObjeto) throws WebServiceException {
		// TODO Auto-generated method stub
		return null;
	}

	/* (non-Javadoc)
	 * @see br.net.walltec.api.rest.comum.RequisicaoRestPadrao#getServico()
	 */
	@Override
	public CrudPadraoServico<?, ?> getServico() {
		// TODO Auto-generated method stub
		return servico;
	}

}
