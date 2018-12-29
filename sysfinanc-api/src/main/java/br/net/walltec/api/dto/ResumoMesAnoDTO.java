/**
 * 
 */
package br.net.walltec.api.dto;

import java.math.BigDecimal;

/**
 * @author wallace
 *
 */
public class ResumoMesAnoDTO {

	private Integer ano;
	
	private Integer mes;
	
	private BigDecimal totalDespesas;
	
	private BigDecimal totalReceitas;
	
	private BigDecimal saldoFinal;
	
	private BigDecimal valorConciliado;
	
	private BigDecimal valorNaoConciliado = BigDecimal.ZERO;

	/**
	 * @param ano
	 * @param mes
	 * @param totalDespesas
	 * @param totalReceitas
	 */
	public ResumoMesAnoDTO(Integer ano, Integer mes, BigDecimal totalDespesas, BigDecimal totalReceitas, BigDecimal valorConciliado) {
		super();
		this.ano = ano;
		this.mes = mes;
		this.valorConciliado = valorConciliado;
		this.totalDespesas = totalDespesas != null ? totalDespesas : BigDecimal.ZERO;
		this.totalReceitas = totalReceitas != null ? totalReceitas : BigDecimal.ZERO;
		this.saldoFinal = totalReceitas.subtract(totalDespesas);
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
	 * @return the totalDespesas
	 */
	public BigDecimal getTotalDespesas() {
		return totalDespesas;
	}

	/**
	 * @param totalDespesas the totalDespesas to set
	 */
	public void setTotalDespesas(BigDecimal totalDespesas) {
		this.totalDespesas = totalDespesas;
	}

	/**
	 * @return the totalReceitas
	 */
	public BigDecimal getTotalReceitas() {
		return totalReceitas;
	}

	/**
	 * @param totalReceitas the totalReceitas to set
	 */
	public void setTotalReceitas(BigDecimal totalReceitas) {
		this.totalReceitas = totalReceitas;
	}

	/* (non-Javadoc)
	 * @see java.lang.Object#hashCode()
	 */
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((ano == null) ? 0 : ano.hashCode());
		result = prime * result + ((mes == null) ? 0 : mes.hashCode());
		return result;
	}

	/* (non-Javadoc)
	 * @see java.lang.Object#equals(java.lang.Object)
	 */
	@Override
	public boolean equals(Object obj) {
		if (this == obj) {
			return true;
		}
		if (obj == null) {
			return false;
		}
		if (!(obj instanceof ResumoMesAnoDTO)) {
			return false;
		}
		ResumoMesAnoDTO other = (ResumoMesAnoDTO) obj;
		if (ano == null) {
			if (other.ano != null) {
				return false;
			}
		} else if (!ano.equals(other.ano)) {
			return false;
		}
		if (mes == null) {
			if (other.mes != null) {
				return false;
			}
		} else if (!mes.equals(other.mes)) {
			return false;
		}
		return true;
	}

	/* (non-Javadoc)
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		return String.format("ResumoMesAnoDTO [ano=%s, mes=%s, totalDespesas=%s, totalReceitas=%s]", ano, mes,
				totalDespesas, totalReceitas);
	}

	public BigDecimal getSaldoFinal() {
		return saldoFinal;
	}

	public void setSaldoFinal(BigDecimal saldoFinal) {
		this.saldoFinal = saldoFinal;
	}

	/**
	 * @return the valorConciliado
	 */
	public BigDecimal getValorConciliado() {
		return valorConciliado;
	}

	/**
	 * @param valorConciliado the valorConciliado to set
	 */
	public void setValorConciliado(BigDecimal valorConciliado) {
		this.valorConciliado = valorConciliado;
	}

	public BigDecimal getValorNaoConciliado() {
		return valorNaoConciliado;
	}

	public void setValorNaoConciliado(BigDecimal valorNaoConciliado) {
		this.valorNaoConciliado = valorNaoConciliado;
	}
	
	
}
