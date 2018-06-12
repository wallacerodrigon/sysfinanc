package br.net.walltec.api.vo;

import java.io.Serializable;

public class ResumoLancamentosVO implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private Double totalDespesas;
	private Double totalReceitas;
	/**
	 * @return the totalDespesas
	 */
	public Double getTotalDespesas() {
		return totalDespesas;
	}
	/**
	 * @param totalDespesas the totalDespesas to set
	 */
	public void setTotalDespesas(Double totalDespesas) {
		this.totalDespesas = totalDespesas;
	}
	/**
	 * @return the totalReceitas
	 */
	public Double getTotalReceitas() {
		return totalReceitas;
	}
	/**
	 * @param totalReceitas the totalReceitas to set
	 */
	public void setTotalReceitas(Double totalReceitas) {
		this.totalReceitas = totalReceitas;
	}
	
	
	
	

}
