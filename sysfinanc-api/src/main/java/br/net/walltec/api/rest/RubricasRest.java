package br.net.walltec.api.rest;

import javax.inject.Inject;
import javax.interceptor.Interceptors;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import br.net.walltec.api.excecoes.NegocioException;
import br.net.walltec.api.excecoes.WebServiceException;
import br.net.walltec.api.negocio.servicos.ContaServico;
import br.net.walltec.api.negocio.servicos.comum.CrudPadraoServico;
import br.net.walltec.api.rest.comum.RequisicaoRestPadrao;
import br.net.walltec.api.rest.interceptors.RequisicaoInterceptor;
import br.net.walltec.api.vo.RubricaVO;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;



@Path("/rubricas")
@Produces(value=MediaType.APPLICATION_JSON)
@Interceptors({RequisicaoInterceptor.class})
@Api("Webservice de rubricas")
public class RubricasRest extends RequisicaoRestPadrao<RubricaVO> {

    @Inject
    private ContaServico contaServico;

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@ApiOperation("Lista todas as rubricas cadastradas")
	@ApiResponses(value= {
				@ApiResponse(code=200, message="Retorno bem sucedido", response=RubricaVO.class ),
				@ApiResponse(code=500, message="Erro interno")
	 })  	
	@GET
	public Response listarRubricas(@QueryParam(value="idUsuario") Integer idUsuario, @QueryParam(value="page") Integer pagina){
        try {
            return Response.ok(contaServico.listar(new RubricaVO())).build(); // listarTudo(pagina)).build();
        } catch (NegocioException e) {
            throw new WebServiceException(e.getMessage());
        }
    }
	

    @Override
    public CrudPadraoServico<?, ?> getServico() {
        return contaServico;
    }

	@ApiOperation("Inclui uma rubrica")
	@ApiResponses(value= {
				@ApiResponse(code=200, message="Retorno bem sucedido"),
				@ApiResponse(code=500, message="Erro interno")
	 })      
    @Override
    public Response incluir(RubricaVO objeto) throws WebServiceException {
        try {
            contaServico.incluirVO(objeto);
            return Response.ok().build();
        } catch (NegocioException e) {
            throw new WebServiceException(e.getMessage());
        } catch(Exception e){
            e.printStackTrace();
            throw new WebServiceException(e.getMessage());
        }
    }

	@ApiOperation("Altera uma rubrica")
	@ApiResponses(value= {
				@ApiResponse(code=200, message="Retorno bem sucedido"),
				@ApiResponse(code=500, message="Erro interno")
	 })  	
    @Override
    public Response alterar(RubricaVO objeto) throws WebServiceException {
        try {
            contaServico.alterarVO(objeto);
            return Response.ok().build();
        } catch (NegocioException e) {
            throw new WebServiceException(e.getMessage());
        } catch(Exception e){
            e.printStackTrace();
            throw new WebServiceException(e.getMessage());
        }
    }

	@ApiOperation("Exclui uma rubrica")
	@ApiResponses(value= {
				@ApiResponse(code=200, message="Retorno bem sucedido"),
				@ApiResponse(code=500, message="Erro interno")
	 })  	
    @Override
    public Response excluir(Integer idChaveObjeto) throws WebServiceException {
        try {
            contaServico.excluir(idChaveObjeto);
            return Response.ok().build();
        } catch (NegocioException e) {
            throw new WebServiceException(e.getMessage());
        } catch(Exception e){
            e.printStackTrace();
            throw new WebServiceException(e.getMessage());
        }
	}
}
