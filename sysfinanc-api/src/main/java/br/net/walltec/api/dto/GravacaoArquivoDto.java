/**
 * 
 */
package br.net.walltec.api.dto;

/**
 * @author wallace
 *
 */
public class GravacaoArquivoDto extends DtoPadrao {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private String arquivoBase64;
	

	/**
	 * @return the arquivoBase64
	 */
	public String getArquivoBase64() {
		return arquivoBase64;
	}

	/**
	 * @param arquivoBase64 the arquivoBase64 to set
	 */
	public void setArquivoBase64(String arquivoBase64) {
		this.arquivoBase64 = arquivoBase64;
	}

	
}
