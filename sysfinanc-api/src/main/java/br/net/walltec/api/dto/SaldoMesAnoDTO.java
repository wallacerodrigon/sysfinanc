/**
 * 
 */
package br.net.walltec.api.dto;

import java.io.Serializable;
import java.math.BigDecimal;

/**
 * @author tr301222
 *
 */
public class SaldoMesAnoDTO implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private String descMes;
	
	private BigDecimal valor;
	
	

	/**
	 * @param descMes
	 * @param valor
	 */
	public SaldoMesAnoDTO(String descMes, BigDecimal valor) {
		super();
		this.descMes = descMes;
		this.valor = valor;
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
	 * @return the valor
	 */
	public BigDecimal getValor() {
		return valor;
	}

	/**
	 * @param valor the valor to set
	 */
	public void setValor(BigDecimal valor) {
		this.valor = valor;
	}	

	
	
}
