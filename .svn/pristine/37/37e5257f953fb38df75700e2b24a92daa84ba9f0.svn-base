/**
 * 
 */
package br.net.walltec.api.rest.dto.filtro;

import java.io.Serializable;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import br.net.walltec.api.utilitarios.UtilData;

/**
 * @author wallace
 *
 */
public abstract class FiltroRelatorioDTO implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private String dataInicial;
	
	private String dataFinal;
	
	private boolean imprime = false;
	
	private HttpServletRequest request;
	
	private HttpServletResponse response;

	/**
	 * @return the dataInicial
	 */
	public String getDataInicial() {
		return dataInicial;
	}

	/**
	 * @param dataInicial the dataInicial to set
	 */
	public void setDataInicial(String dataInicial) {
		this.dataInicial = dataInicial;
	}

	/**
	 * @return the dataFinal
	 */
	public String getDataFinal() {
		return dataFinal;
	}

	/**
	 * @param dataFinal the dataFinal to set
	 */
	public void setDataFinal(String dataFinal) {
		this.dataFinal = dataFinal;
	}

	/**
	 * @return the visualiza
	 */
	public boolean isImprime() {
		return imprime;
	}

	/**
	 * @param visualiza the visualiza to set
	 */
	public void setImprime(boolean imprime) {
		this.imprime = imprime;
	}

	/**
	 * @return the request
	 */
	public HttpServletRequest getRequest() {
		return request;
	}

	/**
	 * @param request the request to set
	 */
	public void setRequest(HttpServletRequest request) {
		this.request = request;
	}
	
	public abstract boolean isFiltroValido();
	
	public Date getDataFinalConvertida(){
		return this.getDataFinal() != null && !this.getDataFinal().trim().isEmpty() ? UtilData.getData(this.getDataFinal(), "/") : null;
	}
	
	public Date getDataInicialConvertida(){
		return this.getDataInicial() != null && !this.getDataInicial().trim().isEmpty() ? UtilData.getData(this.getDataInicial(), "/") : null;
	}

	/**
	 * @return the response
	 */
	public HttpServletResponse getResponse() {
		return response;
	}

	/**
	 * @param response the response to set
	 */
	public void setResponse(HttpServletResponse response) {
		this.response = response;
	}

	/* (non-Javadoc)
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		return String.format("dataInicial=%s, dataFinal=%s", dataInicial, dataFinal);
	}
	
	
	
}
