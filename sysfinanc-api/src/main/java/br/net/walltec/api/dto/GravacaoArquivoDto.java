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
	private String strDataVencimento;
	private Integer banco;
	private String nomeArquivo;
	private String fileType;

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

	/**
	 * @return the strDataVencimento
	 */
	public String getStrDataVencimento() {
		return strDataVencimento;
	}

	/**
	 * @param strDataVencimento the strDataVencimento to set
	 */
	public void setStrDataVencimento(String strDataVencimento) {
		this.strDataVencimento = strDataVencimento;
	}

	/**
	 * @return the banco
	 */
	public Integer getBanco() {
		return banco;
	}

	/**
	 * @param banco the banco to set
	 */
	public void setBanco(Integer banco) {
		this.banco = banco;
	}

	/**
	 * @return the nomeArquivo
	 */
	public String getNomeArquivo() {
		return nomeArquivo;
	}

	/**
	 * @param nomeArquivo the nomeArquivo to set
	 */
	public void setNomeArquivo(String nomeArquivo) {
		this.nomeArquivo = nomeArquivo;
	}

	/**
	 * @return the fileType
	 */
	public String getFileType() {
		return fileType;
	}

	/**
	 * @param fileType the fileType to set
	 */
	public void setFileType(String fileType) {
		this.fileType = fileType;
	}

	
}
