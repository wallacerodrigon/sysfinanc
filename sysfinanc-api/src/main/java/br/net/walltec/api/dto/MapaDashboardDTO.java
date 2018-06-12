/**
 * 
 */
package br.net.walltec.api.dto;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Set;

/**
 * @author wallace
 *
 */
public class MapaDashboardDTO implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private BigDecimal totalEntradas;
	
	private BigDecimal totalSaidas;
	
	private BigDecimal totalPagar;
	
	private BigDecimal totalPago;
	
	private BigDecimal saldoEmConta;
	
	private Set<RubricaMesAnoDTO> rubricaMesAnoDTO;

	/**
	 * @return the totalEntradas
	 */
	public BigDecimal getTotalEntradas() {
		return totalEntradas;
	}

	/**
	 * @param totalEntradas the totalEntradas to set
	 */
	public void setTotalEntradas(BigDecimal totalEntradas) {
		this.totalEntradas = totalEntradas;
	}

	/**
	 * @return the totalSaidas
	 */
	public BigDecimal getTotalSaidas() {
		return totalSaidas;
	}

	/**
	 * @param totalSaidas the totalSaidas to set
	 */
	public void setTotalSaidas(BigDecimal totalSaidas) {
		this.totalSaidas = totalSaidas;
	}

	/**
	 * @return the totalPagar
	 */
	public BigDecimal getTotalPagar() {
		return totalPagar;
	}

	/**
	 * @param totalPagar the totalPagar to set
	 */
	public void setTotalPagar(BigDecimal totalPagar) {
		this.totalPagar = totalPagar;
	}

	/**
	 * @return the saldoEmConta
	 */
	public BigDecimal getSaldoEmConta() {
		return saldoEmConta;
	}

	/**
	 * @param saldoEmConta the saldoEmConta to set
	 */
	public void setSaldoEmConta(BigDecimal saldoEmConta) {
		this.saldoEmConta = saldoEmConta;
	}

	/**
	 * @return the rubricaMesAnoDTO
	 */
	public Set<RubricaMesAnoDTO> getRubricaMesAnoDTO() {
		return rubricaMesAnoDTO;
	}

	/**
	 * @param rubricaMesAnoDTO the rubricaMesAnoDTO to set
	 */
	public void setRubricaMesAnoDTO(Set<RubricaMesAnoDTO> rubricaMesAnoDTO) {
		this.rubricaMesAnoDTO = rubricaMesAnoDTO;
	}

	/**
	 * @return the totalPago
	 */
	public BigDecimal getTotalPago() {
		return totalPago;
	}

	/**
	 * @param totalPago the totalPago to set
	 */
	public void setTotalPago(BigDecimal totalPago) {
		this.totalPago = totalPago;
	}
	
	
	

	
}
