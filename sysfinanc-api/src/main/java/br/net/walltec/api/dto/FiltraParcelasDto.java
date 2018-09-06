/**
 * 
 */
package br.net.walltec.api.dto;

/**
 * @author Wallace
 *
 */
public class FiltraParcelasDto extends DtoPadrao {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private Integer mes, ano, idConta, idParcelaOrigem;

	/**
	 * @param mes
	 * @param ano
	 */
	public FiltraParcelasDto(Integer mes, Integer ano) {
		super();
		this.mes = mes;
		this.ano = ano;
	}


	/**
	 * @return the mes
	 */
	public Integer getMes() {
		return mes;
	}

	/**
	 * @param mes the mes to set
	 */
	public void setMes(Integer mes) {
		this.mes = mes;
	}

	/**
	 * @return the ano
	 */
	public Integer getAno() {
		return ano;
	}

	/**
	 * @param ano the ano to set
	 */
	public void setAno(Integer ano) {
		this.ano = ano;
	}

	public Integer getIdConta() {
		return idConta;
	}

	public void setIdConta(Integer idConta) {
		this.idConta = idConta;
	}

	public Integer getIdParcelaOrigem() {
		return idParcelaOrigem;
	}

	public void setIdParcelaOrigem(Integer idParcelaOrigem) {
		this.idParcelaOrigem = idParcelaOrigem;
	}

	@Override
	public String toString() {
		return "FiltraParcelasDto [mes=" + mes + ", ano=" + ano + "]";
	}
	
	
	
}
