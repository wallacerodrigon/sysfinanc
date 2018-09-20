package br.net.walltec.api.rest.comum;


import java.util.List;
import java.util.logging.Logger;

import javax.annotation.PostConstruct;
import javax.enterprise.context.Dependent;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import br.net.walltec.api.excecoes.NegocioException;
import br.net.walltec.api.excecoes.WebServiceException;
import br.net.walltec.api.negocio.servicos.comum.CrudPadraoServico;
import br.net.walltec.api.rest.dto.filtro.FiltroRelatorioDTO;
import br.net.walltec.api.tokens.TokenManager;
import br.net.walltec.api.utilitarios.Constantes;
import br.net.walltec.api.vo.GerenciadorPadraoVO;

@SuppressWarnings("ALL")
@Produces(value={MediaType.APPLICATION_JSON})
@Dependent
public abstract class RequisicaoRestPadrao<V extends GerenciadorPadraoVO> implements ContratoPadraoRest<V>  {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	protected java.util.logging.Logger log = Logger.getLogger(this.getClass().getName());

	@Context
	private HttpHeaders headers;
	
	@Context
	private HttpServletResponse response;
	
	private HttpServletRequest request;
	
	private CrudPadraoServico<?,V> servico;
	
	@PostConstruct
	public void init(){
		//executado antes do web service e depois do interceptor
		log.info("Init do método requisicao rest padrao"); 
	}
	
	
	public HttpHeaders getHeaders() {
		return headers;
	}

	public abstract CrudPadraoServico<?, ?> getServico();

	
	/* (non-Javadoc)
	 * @see br.net.walltec.api.rest.webservices.ContratoPadraoRest#novo()
	 */
	@Override
	public Response novo() throws WebServiceException {
		return Response.ok().build();
	}

	/* (non-Javadoc)
	 * @see br.net.walltec.api.rest.webservices.ContratoPadraoRest#procurar(java.lang.Integer)
	 */
	@Override
	public Response procurar(Integer idProcura) throws WebServiceException {
		// TODO Auto-generated method stub
		try {
			return Response.ok().entity(getServico().buscar(idProcura)).build();
		} catch (NegocioException e) {
			// TODO Auto-generated catch block
			throw new WebServiceException(e.getMessage());
		}
	}


	/* (non-Javadoc)
	 * @see br.net.walltec.api.rest.webservices.ContratoPadraoRest#listar()
	 */
	@Override
	public Response listar(@QueryParam(value="page") Integer pagina) throws WebServiceException {
		try {
			return Response.ok(getServico().listarTudo(pagina)).build();
		} catch (NegocioException e) {
			// TODO Auto-generated catch block
			throw new WebServiceException(e.getMessage());
		}
	}
	
	public synchronized Integer getIdUsuarioLogado(){
		String token = getHeaders().getHeaderString(Constantes.TAG_TOKEN);
		String subject = new TokenManager().getSubject(token);
		String[] dados = subject.split("@");
		return Integer.valueOf(dados[0]);
		
	}
	
	protected void configurarFiltro(FiltroRelatorioDTO filtro, HttpServletRequest req, HttpServletResponse response) {
		filtro.setRequest(req);
		filtro.setResponse(response);
		
	}
	
	/* (non-Javadoc)
	 * @see br.net.walltec.api.rest.comum.ContratoPadraoRest#alterar(java.util.List)
	 */
	@Override
	public Response alterar(List<V> lista) throws WebServiceException {
		throw new WebServiceException(Response.serverError().build());
	}

	public void addHeader(String name, String value) {
		if (this.response != null) {
			response.addHeader(name, value);
		}
	}
	
}
