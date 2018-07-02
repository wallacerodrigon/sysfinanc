package br.net.walltec.api.rest.interceptors;



import java.util.logging.Logger;

import javax.inject.Named;
import javax.interceptor.AroundInvoke;
import javax.interceptor.Interceptor;
import javax.interceptor.InvocationContext;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.Response.Status;

import br.net.walltec.api.excecoes.NegocioException;
import br.net.walltec.api.excecoes.WebServiceException;
import br.net.walltec.api.rest.comum.RequisicaoRestPadrao;
import br.net.walltec.api.tokens.TokenManager;
import br.net.walltec.api.utilitarios.Constantes;


@Named
@Interceptor

/**
 * Interceptador para todas as requisições
 * */
public class RequisicaoInterceptor {

	private Logger log = Logger.getLogger(this.getClass().getName());
	
	@SuppressWarnings("rawtypes")
	@AroundInvoke
	public Object verificarRequisicao(InvocationContext contexto) throws Exception {
		log.info("Executando interceptor no método " + contexto.getMethod().getName() + " classe: " + contexto.getClass().getName());
		
		if (contexto.getTarget() != null){
			HttpHeaders headers = ((RequisicaoRestPadrao)contexto.getTarget()).getHeaders();
			configurarHeaders(headers);

	        boolean ehLogin = contexto.getMethod().getName().equalsIgnoreCase("efetuarLogin");
	        
	        if (ehLogin) {
	        	return contexto.proceed();
	        }
			
			String token = recuperarToken(headers);			
			
			
			validarToken(token, contexto);
		}
		
		
		Object objeto = contexto.proceed();
		log.info("Finalizando interceptor");

		return objeto;
	}

	/**
	 * @param headers
	 */
	private void configurarHeaders(HttpHeaders headers) {
	}

	/**
	 * @param headers
	 * @return
	 * @throws NegocioException
	 */
	private String recuperarToken(HttpHeaders headers) throws NegocioException {
		String token = headers.getHeaderString(Constantes.TAG_TOKEN);
		
		if (token == null) {
			throw new NegocioException("Requisição sem token");
		}
		
		if (!token.startsWith("Bearer")) {
			throw new NegocioException("Requisição sem token no header apropriado");
		}
		return token;
	}

	/**
	 * @param token
	 * @param contexto 
	 * @param ehLogin
	 */
	private void validarToken(String token, InvocationContext contexto) {
		token = token.split(" ")[1];	        
        boolean ehLogin = contexto.getMethod().getName().equalsIgnoreCase("efetuarLogin");
		
		if (!ehLogin && naoHaToken(token) ){
			throw new WebServiceException(Status.UNAUTHORIZED);
		}
		
		if (!ehLogin &&  !new TokenManager().isTokenValido(token)){
			throw new WebServiceException(Status.FORBIDDEN);
		}
	}
	
	private boolean naoHaToken(String token){
		return token == null || token.isEmpty();		
	}
}
