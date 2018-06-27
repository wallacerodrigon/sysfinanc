/**
 * 
 */
package br.net.walltec.api.rest;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.inject.Named;
import javax.interceptor.Interceptors;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import br.net.walltec.api.dto.RecuperaUsuarioLoginSenhaDto;
import br.net.walltec.api.excecoes.NegocioException;
import br.net.walltec.api.excecoes.RegistroNaoEncontradoException;
import br.net.walltec.api.excecoes.WebServiceException;
import br.net.walltec.api.negocio.servicos.UsuarioServico;
import br.net.walltec.api.negocio.servicos.comum.CrudPadraoServico;
import br.net.walltec.api.rest.comum.RequisicaoRestPadrao;
import br.net.walltec.api.rest.interceptors.RequisicaoInterceptor;
import br.net.walltec.api.vo.UsuarioVO;

/**
 * @author wallace
 *
 */
@Named
@RequestScoped

@Path("/usuario")
@Produces(value={MediaType.APPLICATION_JSON})
@Consumes(value={MediaType.APPLICATION_JSON})
@Interceptors({RequisicaoInterceptor.class})

@SuppressWarnings("serial")
public class UsuarioRest extends RequisicaoRestPadrao<UsuarioVO> {
	@Inject
	private UsuarioServico servico;
	
	/* (non-Javadoc)
	 * @see br.net.walltec.api.rest.RequisicaoRestPadrao#getServico()
	 */
	@Override
	public CrudPadraoServico<?, ?> getServico() {
		return servico;
	}

	@GET
	@Path("/ping")
	public Response testePing(){
		return Response.ok("Ping").build();
	}

	/* (non-Javadoc)
	 * @see br.net.walltec.api.rest.webservices.ContratoPadraoRest#incluir(br.net.walltec.api.vo.GerenciadorPadraoVO)
	 */
	@Override
	public Response incluir(UsuarioVO objeto) throws WebServiceException {
		try {
			servico.incluirVO(objeto);
			return Response.ok().build();
		} catch (NegocioException e) {
			throw new WebServiceException(e.getMessage());
		} catch(Exception e){
			e.printStackTrace();
			throw new WebServiceException(e.getMessage());
		}
	}

	/* (non-Javadoc)
	 * @see br.net.walltec.api.rest.webservices.ContratoPadraoRest#alterar(br.net.walltec.api.vo.GerenciadorPadraoVO)
	 */
	@Override
	public Response alterar(UsuarioVO objeto) throws WebServiceException {
		try {
			servico.alterarVO(objeto);
			return Response.ok().build();
		} catch (NegocioException e) {
			throw new WebServiceException(e.getMessage());
		} catch(Exception e){
			e.printStackTrace();
			throw new WebServiceException(e.getMessage());
		}
	}

	/* (non-Javadoc)
	 * @see br.net.walltec.api.rest.webservices.ContratoPadraoRest#excluir(java.lang.Integer)
	 */
	@Override
	public Response excluir(Integer idChaveObjeto) throws WebServiceException {
		// TODO Auto-generated method stub
		return Response.noContent().build();
	}

	@POST
    @Path("/efetuarLogin")
	public Response efetuarLogin(RecuperaUsuarioLoginSenhaDto dto) throws WebServiceException {

        try {
            return Response.ok(servico.recuperarUsuarioPorLoginSenha(dto)).build();
        } catch (RegistroNaoEncontradoException e) {
            throw new WebServiceException(Status.FORBIDDEN);
        } catch(Exception e){
            e.printStackTrace();
            throw new WebServiceException(e.getMessage());
        }

	}
	
}
