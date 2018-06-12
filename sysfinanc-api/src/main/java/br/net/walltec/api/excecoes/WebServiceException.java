package br.net.walltec.api.excecoes;



import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

/**
 * @author wallace
 * 
 */
public class WebServiceException extends WebApplicationException {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public WebServiceException(){
		super();
	}

	
	public WebServiceException(Status status){
		super(status.getStatusCode());
	}
	
	public WebServiceException(String mensagem){
		this( Response.serverError().entity(mensagem).build() );
	}	
	
	public Response getServerError(){
		return Response.serverError().build();
	}
	
    public WebServiceException(final Response response) {
       super(response);
    }	
	
    
 
}
