/**
 * 
 */
package br.net.walltec.api.dto;

import java.math.BigDecimal;

import br.net.walltec.api.utilitarios.Constantes;

/**
 * @author wallace
 *
 */
public class LancamentosPorRubricaDTO {
	
	private Integer ano;
	
	private String descMes;
	
	private String descConta;
	
	private BigDecimal totalDoMes;
	
	private Double percentualDoTotal;

	private int mes;
	
	
	
	
	/**
	 * @param mes
	 * @param descConta
	 * @param totalDoMes
	 * @param percentualDoTotal
	 */
	public LancamentosPorRubricaDTO(int mes, String descConta, BigDecimal totalDoMes, Double percentualDoTotal) {
		super();
		this.mes = mes;
		this.descConta = descConta;
		this.totalDoMes = totalDoMes;
		this.percentualDoTotal = percentualDoTotal;
		this.descMes = Constantes.meses[mes -1];
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

	/**
	 * @return the descMes
	 */
	public String getDescMes() {
		return descMes;
	}

	/**
	 * @param descMes the descMes to set
	 */
	public void setDescMes(String descMes) {
		this.descMes = descMes;
	}

	/**
	 * @return the totalDoMes
	 */
	public BigDecimal getTotalDoMes() {
		return totalDoMes;
	}

	/**
	 * @param totalDoMes the totalDoMes to set
	 */
	public void setTotalDoMes(BigDecimal totalDoMes) {
		this.totalDoMes = totalDoMes;
	}

	/**
	 * @return the percentualDoTotal
	 */
	public Double getPercentualDoTotal() {
		return percentualDoTotal;
	}

	/**
	 * @param percentualDoTotal the percentualDoTotal to set
	 */
	public void setPercentualDoTotal(Double percentualDoTotal) {
		this.percentualDoTotal = percentualDoTotal;
	}

	/**
	 * @return the descConta
	 */
	public String getDescConta() {
		return descConta;
	}

	/**
	 * @param descConta the descConta to set
	 */
	public void setDescConta(String descConta) {
		this.descConta = descConta;
	}

	/**
	 * @return the mes
	 */
	public int getMes() {
		return mes;
	}

	/**
	 * @param mes the mes to set
	 */
	public void setMes(int mes) {
		this.mes = mes;
	}

	/* (non-Javadoc)
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		return String.format(
				"LancamentosPorRubricaDTO [descMes=%s, mes=%s, descConta=%s, totalDoMes=%s, percentualDoTotal=%s]",
				descMes, mes, descConta, totalDoMes, percentualDoTotal);
	}


	
}
