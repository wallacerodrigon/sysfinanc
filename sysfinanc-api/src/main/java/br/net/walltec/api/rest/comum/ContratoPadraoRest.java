/**
 * 
 */
package br.net.walltec.api.rest.comum;

import java.io.Serializable;
import java.util.List;

import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Response;

import br.net.walltec.api.excecoes.WebServiceException;
import br.net.walltec.api.vo.GerenciadorPadraoVO;

/**
 * @author wallace
 *
 */
public interface ContratoPadraoRest<V extends GerenciadorPadraoVO> extends Serializable {

	 @GET
	 @Path("/ping")
	 Response novo() throws WebServiceException;
	 
	 @PUT
	 Response alterar(List<V> lista) throws WebServiceException;	 
	 
	 @DELETE
	 @Path("/{idChaveObjeto}")
	 Response excluir(@PathParam("idChaveObjeto") Integer idChaveObjeto) throws WebServiceException;
	 
	 @GET
	 @Path("/{idProcura}")
	 Response procurar(@PathParam("idProcura") Integer idProcura) throws WebServiceException;
	 
	 @GET
	 Response listar(@QueryParam(value="page") Integer pagina) throws WebServiceException;
	 
}
